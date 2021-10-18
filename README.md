Forumforum

Description

MVP Scope and User stories

Backlog

Models

# Forumforum

<br><br>

## Description

A forum websit for users to submit posts and have discussions.

<br><br>

## MVP Scope and User stories

- signup - As a new user I want a sign button and page so that I can sign up.
- login - As an exsisting user I want a login button and page so that I can sign in.
- homepage - As a user I want home page were I can preview the posts they are used in.
- profile - As a user I want a profile page

<br><br>

### Backlog

List of of features outside of the MVP's scope

Like:

- Users like the posts which created by the other member

Stalk:

- User can follow the posts which they are interested in

Chat:

- User can communicate with other through chat function

<br><br>

## Models

<br>

### User model:

username,
password,
created Topics

### Topid model:

title,
description,
creater,
userComments,
like

### Comment model:

topicComment,
creater,
relatedTopic
