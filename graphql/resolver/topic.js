const Topic = require("../model/topic");
const User = require("../model/user");

module.exports = {
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
  deleteTopic: async (args) => {
    try {
      const topic = await Topic.findById(args.topicId);
      await Topic.deleteOne({ _id: args.topicId });
      return topic;
    } catch (err) {
      throw err;
    }
  },
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
  posts: async (args, req) => {
    try {
      const topics = await Topic.find({});
      return topics;
    } catch (err) {
      throw err;
    }
  },
};
