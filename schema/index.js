const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql');

const pgContext = require('../db-context/pg-db-context');

/*  Type Declarations */
const AdjusterType = require('./types/adjuster-type');

/*  Type Declarations */
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    adjuster: {
      type: AdjusterType,
      description: 'Adjuster information who is tasked to work on claims',
      args: {
        key: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (obj, args, {
        pgPool,
        loaders
      }) => {
        //return loaders.adjustersByKeys.load(args.key);
        return pgContext(pgPool).getAdjusterByKey(args.key);
      }
    }
  }
});

const AddAdjusterMutation = require('./types/add-adjuster-type') ;

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () =>  ({AddAdjsuter: AddAdjusterMutation})
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports.ncSchema = ncSchema;