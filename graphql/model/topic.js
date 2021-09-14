const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    topic: {
      type: String,
    },
    description: {
      type: String,
    },
    creater: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
