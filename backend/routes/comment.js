
import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import { AnimeModel } from "../models/Anime.js";
import { UserModel } from "../models/Users.js";
import { ScoreModel } from "../models/Score.js";
import { CommentModel } from "../models/Comment.js";
const router = express.Router();

router.post('/:animeId', async (req, res) => {
  try {
    const { animeId } = req.params;
    const { comment, username } = req.body;

    const anime = await AnimeModel.findById(animeId);

    if (!anime) {
      return res.status(404).json({ error: 'Anime not found' });
    }

    // Save the comment in anime.comments
    anime.comments.push({ username, comment });

    // Create a new CommentModel instance and save the comment there as well
    const newComment = new CommentModel({ username, comment });
    await newComment.save();

    await anime.save();

    res.json({ message: 'Comment added successfully', anime });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('An error occurred while adding the comment');
  }
});
  
// Like a comment
router.put("/:commentId/like", async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Increment the likes field by 1
    comment.likes += 1;

    await comment.save();

    res.json({ message: "Comment liked successfully", comment });
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).send("An error occurred while liking the comment");
  }
});

// Dislike a comment
router.put("/:commentId/dislike", async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Increment the dislikes field by 1
    comment.dislikes += 1;

    await comment.save();

    res.json({ message: "Comment disliked successfully", comment });
  } catch (error) {
    console.error("Error disliking comment:", error);
    res.status(500).send("An error occurred while disliking the comment");
  }
});
 
// Edit a comment
router.put("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    const existingComment = await CommentModel.findById(commentId);

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Update the comment text
    existingComment.comment = comment;

    await existingComment.save();

    res.json({ message: "Comment updated successfully", comment: existingComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).send("An error occurred while updating the comment");
  }
});

// Delete a comment
router.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await CommentModel.deleteOne({ _id: commentId });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send("An error occurred while deleting the comment");
  }
});
  export {router as commentRouter};