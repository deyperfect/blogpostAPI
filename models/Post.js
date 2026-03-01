const mongoose = require("mongoose");
const { commentSchema } = require('./Comment');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    author: { // snapshot of username
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [10, "Post content is too short"],
    },

    comments: [commentSchema], 
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Post", postSchema);