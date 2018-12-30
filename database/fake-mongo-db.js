const {
  MongoClient
} = require('mongodb');
const {
  nodeEnv
} = require('../lib/utils.js');
const mongoConfig = require('../config/mongo');
const assert = require('assert');

const url = mongoConfig[nodeEnv].url;


MongoClient.connect(url, {
  useNewUrlParser: true
}, (err, db) => {

  assert.equal(err, null);
  assert.notEqual(db, null);

  const seeds = [{
      userId: 1,
      bookIssued: 10,
      bookReturned: 100,
      name: 'khurram mughal',
      email: 'kmughal@gmail.com',
      country: 'uk',
      created_at: new Date()
    },
    {
      userId: 2,
      bookIssued: 0,
      bookReturned: 10,
      name: 'Peter',
      email: 'fake@gmail.com',
      country: 'usa',
      created_at: new Date()
    }
  ];
  db.db("Fake_Claim_Store").createCollection("users").then(c => {
    c.insertMany(seeds);
  });
});