const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserBookKeepingHistoryType',
  fields: {
    userId: {
      type: GraphQLInt
    },
    bookIssued: {
      type: GraphQLInt
    },
    bookReturned: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  }
});