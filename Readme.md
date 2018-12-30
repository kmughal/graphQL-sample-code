# Introduction

A sample code which uses GraphQL.

I have used MongoDB and Postgres as data holders.

- First of all run `npm i` which will install all packages.
- You might have to add seed data so that you will be able to see something in the GraphQL console.

In order to install mongodb follow these steps.

- Install mongodb: `brew install mongodb`
- Run `mongo`
- Run `node database/fake-mongo-db.js`

All above commands you can run in the terminal.

In order to install Postgres follow these steps.

- Run `brew install postgresql`
- Add alias

`sh
  alias pg_start="launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
  alias pg_stop="launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"`

- Run `pg_start`
- Run `createdb Fake_Claim_Store`
- Run `psql Fake_Claim_Store  < database/fake-pg-query.sql` 


In order to run node server please run `node run start` then put `http:localhost/graphql` address in browser. This will take you to the graphQL console.

For read you can try following query:
`
{
  adjuster(key: 5) {
    id
    name
    country
    description
    claims {
      claimNumber
      claimStatus
    }
    books {
      userId
      name
      email
    }
  }
}
`

For write you can try the following command:
`
mutation AddAdjsuter($input:AdjusterInput!) {
  AddAdjsuter(input:$input) {
     name
    country
  }
}
`

For input values:

`
{
  "input": {
    "name": "Khurram Mughal",
    "country": "United Kingdom"
  }
}
`