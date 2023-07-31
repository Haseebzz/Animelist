import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import { AnimeModel } from "../models/Anime.js";
import { UserModel } from "../models/Users.js";
import { ScoreModel } from "../models/Score.js";

const router = express.Router();
router.post('/:animeId', async (req, res) => {
  try {
    const { animeId } = req.params;
    const { score, userID } = req.body;

    // Validate user's score
    if (score < 1 || score > 10) {
      return res.status(400).json({ error: 'Invalid score. Score must be between 1 and 10.' });
    }

    // Find the anime by _id
    const anime = await AnimeModel.findById(animeId);

    if (!anime) {
      return res.status(404).json({ error: 'Anime not found' });
    }

    const existingScoreIndex = anime.userScores.findIndex((userScore) => userScore.userID.toString() === userID);

    if (existingScoreIndex !== -1) {
      // If the user has already submitted a score, return an error
      return res.status(400).json({ error: 'User has already submitted a score for this anime.' });
    }

    // Create a new score document
    const newScore = new ScoreModel({ score, userID });

    // Save the new score
    await newScore.save();

    // Add the new score to the anime's userScores array
    anime.userScores.push(newScore);

    // Calculate the updated average score and scored_by count
    const existingTotalScores = anime.scored_by;
    const existingTotalScore = anime.score * existingTotalScores;
    const totalScores = existingTotalScores + 1;
    const totalScore = existingTotalScore + score;
    const updatedAverageScore = parseFloat((totalScore / totalScores).toFixed(2));

    // Update the anime's average score and scored_by count
    anime.score = updatedAverageScore;
    anime.scored_by = totalScores;

    // Save the changes to the anime
    await anime.save();

    res.json({ message: 'Score added successfully', anime });
  } catch (error) {
    console.error('Error adding score:', error);
    res.status(500).send('An error occurred while adding the score');
  }
});

router.put("/:userID/scores/:scoreID", async (req, res) => {
  const { userID, scoreID } = req.params;
  const { updatedScore } = req.body;

  try {
    const user = await UserModel.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let score = await ScoreModel.findById(scoreID);

    if (!score) {
      return res.status(404).json({ message: "Score not found" });
    }

    // Update the score value
    score.score = updatedScore;

    await score.save();

    const anime = await AnimeModel.findOne({ "userScores._id": scoreID });

    if (!anime) {
      return res.status(404).json({ message: "Anime not found" });
    }

    // Update the score in the anime's userScores array
    const userScoreIndex = anime.userScores.findIndex((userScore) =>
      userScore._id.equals(scoreID)
    );

    if (userScoreIndex !== -1) {
      anime.userScores[userScoreIndex].score = updatedScore;
    }

    // Calculate the updated average score
    const totalScores = anime.userScores.length;
    const totalScore = anime.userScores.reduce((sum, userScore) => sum + userScore.score, 0);
    const updatedAverageScore = parseFloat((totalScore / totalScores).toFixed(2));

    // Update the anime's average score and the number of users who scored
    anime.averageScore = updatedAverageScore;
    anime.scoredBy = totalScores;

    await anime.save();

    // Update the score in the user's animelist
    const animeItem = user.animelist.find((item) => item.anime.toString() === anime._id.toString());

    if (animeItem) {
      animeItem.score = updatedScore;
    }

    await user.save();

    res.json({ message: "Score updated successfully", score, anime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  export {router as scoreRouter};