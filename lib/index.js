// const {graphql} = require('graphql');

// const query = process.argv[2];
// graphql(metadata,query).then(console.log);


const app = require('express')();
const graphqlHTTP = require('express-graphql');
const {
  ncSchema
} = require('../schema');
const PORT_NUM = process.env.PORT_NUM || 3000;

const {
  nodeEnv
} = require('../lib/utils');

// Postgres settings
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const assert = require('assert');

// MongoDB settings
const {
  MongoClient,
  Logger
} = require('mongodb');
const mongoConfig = require('../config/mongo')[nodeEnv];

MongoClient
  .connect(mongoConfig.url, {
    useNewUrlParser: true
  }, (err, client) => {
    assert.equal(null, err);
    assert.notEqual(null, client);

    const mPool = client.db();
    assert.notEqual(null, mPool);

    // Enable mongo client logging.
    // Logger.setLevel('debug');
    // Logger.filter('class',['Pool']);

    app.use('/graphql', (req, res) => {

      const pgContext = require('../db-context/pg-db-context')(pgPool);
      const DataLoader = require('dataloader');

      const loaders = {
        adjustersByKeys: new DataLoader(pgContext.getAdjustersByKeys)
      };

      graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: {
          pgPool,
          mPool,
          loaders
        }
      })(req, res);
    });

    app.listen(PORT_NUM, () => {
      console.log('listening at:', PORT_NUM);
    });

  });