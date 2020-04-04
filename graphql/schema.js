const { gql } = require('apollo-server');

const schema = gql`
  type Activity {
    id: ID!
    title: String!
    description: String
    url: String
    activity_type: [Activity_type]!
    audience: [Audience]!
    contributors: [Contributor]
    approved: Boolean!
  }

  type Contributor {
    id: ID!
    name: String!
    website: String
    twitter: String
    other: String
    bio: String
    headshot: String
    activities: [Activity]
    approved: Boolean! 
  }

  type User {
    id: ID!
    email: String!
    roles: [String!]!
    contributor: Contributor
  }

  type Activity_type {
    id: ID!
    label: String!
  }

  type Audience {
    id: ID!
    label: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type AuthResponse {
    user: User
  }

  input ActivityInput {
    title: String!
    description: String
    url: String
    activity_type: [String!]!
    audience: [String!]!
    contributors: [String]
  }

  input ContributorInput {
    name: String!
    website: String
    twitter: String
    other: String
    bio: String
    headshot: Upload
  }

  type Query {
    activities: [Activity]
    activity(
      id: ID
      activity_type: ID
      audience: ID
      pastResults: [ID]
    ): Activity
    contributors: [Contributor]
    contributor(id: ID!): Contributor
    currentUser: User
  }

  type Mutation {
    register(email: String!, password: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse
    logout: Boolean
    createActivity(activity: ActivityInput): Activity
    createContributor(contributor: ContributorInput): Contributor
  }
`;

module.exports = schema;
