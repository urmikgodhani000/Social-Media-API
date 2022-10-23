const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    tital: {
      type: String,
      trim: true,
      min: 3,
      max: 30,
      required: [true, "Tital is required!"],
    },
    discription: {
      type: String,
      trim: true,
      min: 3,
      max: 3000,
      required: [true, "Discription is required!"],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
