const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      min: 3,
      max: 15,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      validate: [validator.isStrongPassword, "Password not strong enough!"],
      select: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
