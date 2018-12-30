const {
  GraphQLEnumType
} = require('graphql');

module.exports = new GraphQLEnumType({
  name: 'ClaimStatusType',
  values: {
    OPEN: {
      value: 'Open'
    },
    CLOSED: {
      value: 'Closed'
    },
    REOPENED: {
      value: 'Re-open'
    }
  }
});