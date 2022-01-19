# Forumforum

A forum website which is built with GraphQl and React.js for users to submit posts and have discussions.  
Using GraphQL and Mongoose as backend to build the schema for storing forum data and React as frontend to attain and display the data.

## Basic features

- Sign up and login function , user can creat account and login as a member.
- Homepage , user can see all the topics and comments on the first page of the web Application.
- Like , user can like the topics they like
- Comment, user can comment on the topics they want to make comments.

### Backlog

Stalk:

- User can follow the posts which they are interested in

Chat:

- User can communicate with other through chat function

## Goal

- To build the schemas and models with GraphQL, and understand the difference between GraphQL API and Restful API.
- To understand the flexibility by using function to link the information together instead of populating the information only.
- To understand more about React hooks and have more practice on that.
- To understand more about the Components of React.

## What I want to improve

- user can like the comments
- user can view their profile, what they have commented and what are their comments 

## Models

### User model:

```
  username,
  password,
  createdTopics
```

### Topid model:

```
  title,
  description,
  creater,
  userComments,
  like
```

### Comment model:

```
  topicComment,
  creater,
  relatedTopic
```

## Build with

- GraphQL
- React.js
- Mongoose
- Css
