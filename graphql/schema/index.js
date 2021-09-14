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

  type Comment{
    _id:ID!
    comment: String!
    topic: Topic!
    creater:User!
  }

  type AuthData{
    userId:ID!
    token: String!
    tokenExpiration: Int!
  }

  input CommentInput{
    comment: String!
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
    login(username: String!, password: String!): AuthData!
   }

  type RootMutation{
    createTopic(topicInput : TopicInput): Topic
    createUser(userInput : UserInput): User
    createComment(commentInput: CommentInput) : Comment
    deleteTopic(topicId: ID!) : Topic!
    editTopic(topicId:ID!,topicInput:TopicInput!): Topic!
  }
  
  schema{
    query: RootQuery
    mutation: RootMutation
  }
  `);
