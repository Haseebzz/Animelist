import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
});

export const CommentModel = mongoose.model("Comment", commentSchema);