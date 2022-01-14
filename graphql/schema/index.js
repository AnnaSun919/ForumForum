const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
    _id: ID!
    username: String!
    password : String!
    createdTopics: [Topic]!
  }

  type Comment{
    _id:ID!
    topicComment: String!
    relatedTopic: Topic!
    creater:User!
  }

  type Topic {
    _id:ID!
    title:String!
    page:Int!
    description:String!
    creater: User!
    userComments: [Comment]!
    like:[Like]!
  }


  type AuthData{
    userId:ID!
    token: String!
    userName: String!
    tokenExpiration: Int!
  }

  type Like{
    _id:ID!
    user:User!
  }

  input CommentInput{
    topicComment: String!
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
    users: [User!]!
    posts: [Topic!]!
    singlePost(topicId:ID!): Topic!
    comments: [Comment!]!
    login(username: String!, password: String!): AuthData!
    like(topicId:ID!):[Like!]!
   }

  type RootMutation{
    createTopic(topicInput : TopicInput): Topic
    createUser(userInput : UserInput): User
    createComment(topicId:ID!, commentInput: CommentInput) : Comment
    deleteTopic(topicId: ID!) : Topic!
    editTopic(topicId:ID!,topicInput:TopicInput!): Topic!
    likeTopic(topicId: ID!): Topic
  }
  
  schema{
    query: RootQuery
    mutation: RootMutation
  }
  `);
