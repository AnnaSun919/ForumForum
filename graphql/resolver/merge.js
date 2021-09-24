const Topic = require("../model/topic");
const User = require("../model/user");

//by using function here can provide flexibity
//better than populate , the function will be called only when the property is require
//wont create infinite loop

const topics = async (postIds) => {
  try {
    const topics = await Topic.find({ _id: { $in: postIds } });

    topics.map((topic) => {
      return {
        ...topic._doc,
        _id: topic.id,
        title: topic.title,
        creater: user.bind(this, topic.creater),
      };
    });
    return topics;
  } catch (err) {
    throw err;
  }
};

const singletopic = async (postId) => {
  try {
    const post = await Topic.findById(postId);

    return {
      ...post._doc,
      _id: post.id,
      creater: user.bind(this, post.creater),
    };
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);

    return {
      ...user._doc,
      _id: user.id,
      createdTopics: topics.bind(this, user._doc.createdTopics),
    };
  } catch (err) {
    throw err;
  }
};

exports.user = user;
exports.topics = topics;
exports.singletopic = singletopic;
