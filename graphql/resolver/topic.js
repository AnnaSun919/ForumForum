const Topic = require("../model/topic");
const User = require("../model/user");

const { user, comment, topics } = require("./merge");

module.exports = {
  //function for creating posts
  createTopic: async (args, req) => {
    if (!req.checkAuth) {
      throw new Error("unauthenticated");
    }
    const topic = new Topic({
      title: args.topicInput.title,
      description: args.topicInput.description,
      creater: req.userId,
    });

    try {
      await topic.save();

      const creater = await User.findById(req.userId);

      if (!creater) {
        throw new Error("User not found.");
      }

      creater.createdTopics.push(topic);
      await creater.save();
    } catch (err) {
      throw err;
    }
  },

  //function for deleting post
  deleteTopic: async (args) => {
    try {
      const topic = await Topic.findById(args.topicId);
      await Topic.deleteOne({ _id: args.topicId });
      return topic;
    } catch (err) {
      throw err;
    }
  },

  //function for editing post
  editTopic: async (args) => {
    try {
      const topic = await Topic.findByIdAndUpdate(
        { _id: args.topicId },
        {
          title: args.topicInput.title,
          description: args.topicInput.description,
        },
        { new: true }
      );

      return topic;
    } catch (err) {
      throw err;
    }
  },

  //function for showing posts
  posts: async (args, req) => {
    try {
      const topics = await Topic.find({});

      return topics.map((topic) => {
        return {
          ...topic._doc,
          _id: topic.id,
          creater: user.bind(this, topic._doc.creater),
          userComments: comment.bind(this, topic._doc.userComments),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  //function for showing single post
  singlePost: async (args, req) => {
    try {
      const topic = await Topic.findById(args.topicId);

      return {
        ...topic._doc,
        creater: user.bind(this, topic._doc.creater),
        userComments: comment.bind(this, topic._doc.userComments),
      };
    } catch (err) {
      throw err;
    }
  },
};
