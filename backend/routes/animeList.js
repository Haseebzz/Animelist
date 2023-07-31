import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import { AnimeModel } from "../models/Anime.js";
import { UserModel } from "../models/Users.js";
import { ScoreModel } from "../models/Score.js";

const router = express.Router();

router.put("/:userID/:animeID", async (req, res) => {
    const { userID, animeID } = req.params;
  
    try {
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const anime = await AnimeModel.findById(animeID);
  
      if (!anime) {
        return res.status(404).json({ message: "Anime not found" });
      }
  
      // Check if animeId already exists in the user's animelist
      const animeExists = user.animelist.some((item) => item.anime.toString() === animeID);
  
      if (animeExists) {
        return res.status(400).json({ message: "Anime already exists in the user's animelist" });
      }
  
      const userScore = anime.userScores.find(
        (score) => score.userID.toString() === user._id.toString()
      )?.score;
      
      const score = userScore !== undefined && userScore !== null ? userScore : "N/A";
      

      const animeItem = {
        anime: anime._id,
        status: "Watching",
        score: score,
      };
  
      user.animelist.push(animeItem);
      await user.save();
  
      res.json({ message: "Anime added to the user's list successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  
  

  router.put("/:userID/:animeID/status", async (req, res) => {
    const { userID, animeID } = req.params;
    const { status } = req.body;
    
    try {
      const user = await UserModel.findById(userID);
    
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      const animeIndex = user.animelist.findIndex((item) => item.anime.toString() === animeID);
    
      if (animeIndex === -1) {
        return res.status(404).json({ message: "Anime not found in the user's list" });
      }
    
      user.animelist[animeIndex].status = status;
    
      await user.save();
    
      res.json({ message: "Anime status updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

 
  
  router.put("/:userID/:animeID/score", async (req, res) => {
    const { userID, animeID } = req.params;
    const { score } = req.body;
  
    try {
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const anime = await AnimeModel.findById(animeID);
  
      if (!anime) {
        return res.status(404).json({ message: "Anime not found" });
      }
  
      // Find the user's anime entry in the animelist
      const animeItem = user.animelist.find((item) => item.anime.toString() === animeID);
  
      if (!animeItem) {
        return res.status(404).json({ message: "Anime not found in the user's animelist" });
      }
  
      // Update the score in the user's animelist
      animeItem.score = score;
  
      // Find the user's score index in the anime's userScores
      const userScoreIndex = anime.userScores.findIndex((scoreObj) => scoreObj.userID.equals(user._id));
  
      if (userScoreIndex !== -1) {
        // If the user already has a score, update it
        anime.userScores[userScoreIndex].score = score;
      } else {
        // If the user doesn't have a score, create a new score entry for the user
        anime.userScores.push({ userID: user._id, score: score });
      }
  
      // Calculate the updated average score
      const totalScores = anime.userScores.length;
      const totalScore = anime.userScores.reduce((sum, userScore) => sum + userScore.score, 0);
      const updatedAverageScore = parseFloat((totalScore / totalScores).toFixed(2));
  
      // Update the anime's average score and the number of users who scored
      anime.averageScore = updatedAverageScore;
      anime.scoredBy = totalScores;
  
      await anime.save();
  
      // Find the user's score in the score table
      const userScore = await ScoreModel.findOne({ userID, animeID });
  
      if (userScore) {
        // If the user already has a score, update it
        userScore.score = score;
      } else {
        // If the user doesn't have a score, create a new score entry for the user
        const newScore = new ScoreModel({
          userID,
          animeID,
          score,
        });
  
        await newScore.save();
      }
  
      res.json({ message: "Score updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.get("/:userID", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID).populate("animelist.anime");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ animelist: user.animelist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  router.delete("/:userID/:animeID", async (req, res) => {
    const { userID, animeID } = req.params;
  
    try {
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const animelistIndex = user.animelist.findIndex(item => item.anime.toString() === animeID);
  
      if (animelistIndex === -1) {
        return res.status(404).json({ message: "Anime not found in the user's animelist" });
      }
  
      user.animelist.splice(animelistIndex, 1);
      await user.save();
  
      res.json({ message: "Anime removed from the user's animelist successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



  export {router as animelistRouter};