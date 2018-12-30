const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const pgContext = require('../../db-context/pg-db-context');

const AdjusterType = require('../../schema/types/adjuster-type');

let AdjusterInputType = new GraphQLInputObjectType({
  name: 'AdjusterInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    country: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

module.exports = {
  type: AdjusterType,
  args: {
    input: {
      type: new GraphQLNonNull(AdjusterInputType)
    }
  },
  resolve(obj, {
    input
  }, {
    pgPool
  }) {
    return pgContext(pgPool).addNewAdjuster(input);
  }
};