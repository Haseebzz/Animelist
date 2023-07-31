import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  animelist: [
    {
      anime: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "anime",
        unique: true,
        required: true,
      },
      status: {
        type: String,
        enum: ["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"],
        default: "Watching",
      },
      score: {
        type: mongoose.Schema.Types.Mixed, // Allow both numbers and strings
        default: null,
      },
    },
  ],
});

export const UserModel = mongoose.model("User", userSchema);