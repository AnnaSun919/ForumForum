const Comment = require("../model/comment");
const Topic = require("../model/topic");

module.exports = {
  createComment: (arg, req) => {
    const topic = Topic.findById({});
    const comment = new Comment({
      //left is type, right is comment input
      topicComment: arg.commentInput.topicComment,
      creater: req.userId,
    });

    return comment.save();
  },

  comments: async () => {
    try {
      const comments = await Comment.find({});

      return comments;
    } catch (err) {
      throw err;
    }
  },
};
