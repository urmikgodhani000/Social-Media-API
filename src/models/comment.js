const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      min: 3,
      max: 300,
      required: [true, "Content is required!"],
    },
  },
  {
    timestamps: true,
  }
);

const comment = mongoose.model("Comment", commentSchema);
module.exports = comment;
