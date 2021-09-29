const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  creater: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userComments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Topic", topicSchema);
