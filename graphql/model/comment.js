const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  topicComment: {
    type: String,
  },
  creater: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  realtedTopic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
