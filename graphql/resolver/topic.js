const Topic = require("../model/topic");

module.exports = {
  createTopic: (args, req) => {
    if (!req.checkAuth) {
      throw new Error("unauthenticated");
    }
    const topic = new Topic({
      title: args.topicInput.title,
      description: args.topicInput.description,
    });
    return topic.save();
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
};
