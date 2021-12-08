# Forumforum

A forum website which is built with GraphQl and React.js, for users to submit posts and have discussions.
</br>
Using GraphQL and Mongoose as backend to build the schema for storing forum data and React as frontend to attain and display the data.

</br>

## Basic features

- Sign up and login function , user can creat account and login as a member.
- Homepage , user can see all the topics and comments on the first page of the web Application.
- Like , user can like the topics they like
- Comment, user can comment on the topics they want to make comments.

## What I have learned

1. To build the schemas and models with GraphQL, and understand the difference between GraphQL API and Restful API.
2. To understand the flexibility by using function to link the information together instead of populating the information only.
3. To understand more about React hooks and have more practice on that.
4. To understand more about the Components of React.

## What I want to improve

1. improve the frontend styling.
2. show error messages.
3. user can like the comments

<br><br>

### Backlog

Stalk:

- User can follow the posts which they are interested in

Chat:

- User can communicate with other through chat function

<br><br>

## Models

<br>

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
