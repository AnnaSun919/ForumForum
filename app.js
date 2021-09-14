const express = require("express");
const bodyParser = require("body-parser");
//exports that graph QL HTTP here happens to be a function that
//we can use in the place where express expects a middleware function so it basically exports a middleware function
//take incoming requests and funnel them through the graphql parser and automatically forward them to the right resolvers
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graQLSchema = require("./graphql/schema/index");
const graQLRoot = require("./graphql/resolver/auth");

const app = express();
app.use(bodyParser.json());
const topics = [];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graQLSchema,
    rootValue: {
      ...graQLRoot,
      topics: () => {
        return topics;
      },
      createTopic: (args) => {
        const topic = {
          _id: Math.random().toString(),
          title: args.topicInput.title,
          description: args.topicInput.description,
        };
        topics.push(topic);
        return topic;
      },
    },
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("hello world!");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tslo0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
