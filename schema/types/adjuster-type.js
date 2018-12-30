const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');


const ClaimType = require('./claim-type');
const UserBookKeepingHistoryType = require('./user-book-keeping-history');

const pgContext = require('../../db-context/pg-db-context');
const mContenxt = require('../../db-context/mongo-db-context');

module.exports = new GraphQLObjectType({
  name: 'AdjusterType',
  fields: {
    id: {
      type:new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    country: {
      type: new GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString,
      resolve: obj => `${obj.name} lives in ${obj.country}`
    },
    claims: {
      type: new GraphQLList(ClaimType),
      resolve: (obj, args, {
        pgPool,loaders
      }) => {
        return pgContext(pgPool).getClaimsByAdjusterKey(obj);
      }
    },
    books: {
      type: UserBookKeepingHistoryType,
      resolve: (obj, args, {
        mPool
      }) => {
        return mContenxt(mPool).getUserHistoryByKey(obj.id);
      }
    }
  }
});