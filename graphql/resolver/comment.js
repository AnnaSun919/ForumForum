const Comment = require("../model/comment");
const Topic = require("../model/topic");
const User = require("../model/user");
const { user, topics, singletopic } = require("./merge");

module.exports = {
  createComment: async (args, req) => {
    try {
      const post = await Topic.findById(args.topicId);

      const comment = new Comment({
        //left is type, right is comment input
        topicComment: args.commentInput.topicComment,
        creater: req.userId,
        relatedTopic: post,
      });
      console.log(comment);
      post.userComments.push(comment);
      await post.save();
      return comment.save();
    } catch (err) {
      throw err;
    }
  },

  comments: async (args, req) => {
    try {
      const comments = await Comment.find();

      return comments.map((comment) => {
        return {
          ...comment._doc,
          creater: user.bind(this, comment._doc.creater),
          relatedTopic: singletopic.bind(this, comment._doc.relatedTopic),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
