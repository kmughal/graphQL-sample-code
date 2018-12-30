const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const ClaimStatusType = require('./claim-status');

module.exports = new GraphQLObjectType({
  name: 'CliamType',

  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    claimNumber: {
      type: new GraphQLNonNull(GraphQLString)
    },
    instructedDate: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lossDate: {
      type: new GraphQLNonNull(GraphQLString)
    },
    adjusterKey: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },
    claimStatus: {
      type: ClaimStatusType
    }
  }
});