const Topic = require("../model/topic");
const User = require("../model/user");
const Comment = require("../model/comment");

//by using function here can provide flexibity
//better than populate , the function will be called only when the property is require
//wont create infinite loop

//for populate the topics' info in users' and comments' fields
const topics = async (postIds) => {
  try {
    const topics = await Topic.find({ _id: { $in: postIds } });

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
};

//populate single post info
const singletopic = async (postId) => {
  try {
    const post = await Topic.findById(postId);

    return {
      ...post._doc,
      _id: post.id,
      creater: user.bind(this, post._doc.creater),
    };
  } catch (err) {
    throw err;
  }
};

//populate user info
const user = async (userId) => {
  try {
    const user = await User.findById(userId).populate("createdTopics");

    return {
      ...user._doc,
      _id: user.id,
      createdTopics: topics.bind(this, user._doc.createdTopics),
    };
  } catch (err) {
    throw err;
  }
};

//populate comment info
const comment = async (commentId) => {
  try {
    const comments = await Comment.find({ _id: { $in: commentId } });

    return comments.map((comment) => {
      return {
        ...comment._doc,
        _id: comment.id,
        creater: user.bind(this, comment._doc.creater),
        relatedTopic: singletopic.bind(this, comment._doc.relatedTopic),
      };
    });
  } catch (err) {
    throw err;
  }
};

exports.user = user;
exports.topics = topics;
exports.singletopic = singletopic;
exports.comment = comment;
