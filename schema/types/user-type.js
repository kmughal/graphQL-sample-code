const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bookIssued: {
      type: GraphQLInt
    },
    bookReturned: {
      type: GraphQLInt
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    }
  }
});