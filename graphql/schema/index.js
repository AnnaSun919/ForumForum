const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
    _id: ID!
    username: String!
    password : String
    createdTopic: [Topic]!
  }

  type Topic {
    _id:ID!
    title:String!
    description:String!
    creater: User!
  }

  type AuthData{
    userId:ID!
    token: String!
    tokenExpiration: Int!
  }

  input TopicInput{
    title:String!
    description: String!
  }

  input UserInput {
    username: String!
    password : String!
  }

  type RootQuery {
    users: [User]!
    topics: [Topic]!
    login(email: String!, password: String!): AuthData!
   }

  type RootMutation{
    createTopic(topicInput : TopicInput): Topic
    createUser(userInput : UserInput): User
    deleteTopic(topicId: ID!) : Topic!
  }
  
  schema{
    query: RootQuery
    mutation: RootMutation
  }
  `);
