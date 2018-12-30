const camelizeKeys = require('humps').camelizeKeys;
const _ = require('lodash');

const orderBy = (rows, collection, field) => {
  const data = camelizeKeys(rows);
  const groupedData = _.groupBy(data, field);
  console.log(groupedData)
  return collection.map(e => {
    const item = groupedData[e];
    return item ? item : {};
  });
};

module.exports = pgPool => {
  return {
    addNewAdjuster(input) {
      return pgPool.query(`INSERT INTO Adjusters(Name,Country)VALUES($1,$2)
      returning *
      `, [input.name, input.country]).
      then(res => {
        return camelizeKeys(res.rows[0]);
      });
    },
    getAdjustersByKeys(keys) {
      return pgPool.query('SELECT * FROM Adjusters WHERE ID = ANY($1)', [keys])
        .then(res => {
          return orderBy(res.rows, keys, 'id');
        });
    },
    getAdjusterByKey(key) {
      return pgPool.query('SELECT * FROM Adjusters WHERE ID = ($1)', [key])
        .then(res => {
          return camelizeKeys(res.rows[0]);
        });
    },
    getClaimsByAdjusterKey(adjuster) {
      return pgPool.query(`SELECT c.* ,
       cs.Description as Claim_Status
      FROM Claims c JOIN ClaimStatus cs on cs.Id = c.ClaimStatusKey
      WHERE AdjusterKey=$1`, [adjuster.id])
        .then(res => {
          return camelizeKeys(res.rows);
        });
    }
  };
};