const { gql } = require('apollo-server');

const schema = gql`
  type Activity {
    id: ID!
    title: String!
    description: String
    url: String
    activity_type: [ActivityType]!
    audience: [ActivityAudience]!
    contributors: [Contributor]
    approved: Boolean!
    # created_date: String
  }

  type Contributor {
    id: ID!
    name: String!
    website: String
    twitter: String
    other: String
    bio: String
    headshot: File
    activities: [Activity]
    email: String
    approved: Boolean!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  enum ActivityAudience {
    BY_MYSELF
    WITH_MY_KIDS
    WITH_MY_PARTNER
    WITH_MY_FRIENDS
  }

  enum ActivityType {
    PLAY_A_GAME
    LEARN_SOMETHING_NEW
    LEARN_A_PROFESSIONAL_SKILL
    SOMETHING_UNUSUAL
    MAKE_A_CRAFT
    GO_OUTSIDE
    DO_SOMETHING_SIMPLE
    MAKE_ART
    SPRUCE_THINGS_UP
  }

  input ActivityInput {
    title: String!
    description: String
    url: String
    activity_type: [ActivityType]!
    audience: [ActivityAudience]!
    contributors: [String]
  }

  input ContributorInput {
    name: String!
    website: String
    twitter: String
    other: String
    bio: String
    email: String
    headshot: Upload
  }

  type Query {
    activities: [Activity]
    activity(
      id: ID
      activity_type: ActivityType
      audience: ActivityAudience
    ): Activity
    contributors: [Contributor]
    contributor(id: ID!): Contributor
    uploads: [File]
  }

  type Mutation {
    createActivity(activity: ActivityInput): Activity
    createContributor(contributor: ContributorInput): Contributor
    uploadFile(file: Upload!): File!
  }
`;

module.exports = schema;
