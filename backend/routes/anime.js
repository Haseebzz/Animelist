

import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import { AnimeModel } from "../models/Anime.js";
import { UserModel } from "../models/Users.js";
import { ScoreModel } from "../models/Score.js";
const router = express.Router();
import axios from 'axios';
/*app.get('/fetch-anime', async (req, res) => {
  try {
    const totalPages = 993;

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?page=${currentPage}`);
      const animeData = response.data.data;

      // Loop through the animeData array and create Anime documents
      for (const anime of animeData) {
        const newAnime = new AnimeModel({
          mal_id: anime.mal_id,
          title: anime.title,
          // Add other fields as needed
        });
        await newAnime.save();
      }

      // Add a delay of 1 second between each page request
      await delay(1000);
    }

    res.send('Anime data imported successfully');
  } catch (error) {
    console.error('Error importing anime data:', error);
    res.status(500).send('An error occurred while importing anime data');
  }
}); */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
router.get('/fetch', async (req, res) => {
    try {
      const totalPages = 100;
  
      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?page=${currentPage}`);
        const animeData = response.data.data;
  
        // Loop through the animeData array and create Anime documents
        for (const anime of animeData) {
          const newAnime = new AnimeModel({
            ...anime, // Copy all properties of the anime object into the new Anime document
          });
          await newAnime.save();
        }
  
        // Add a delay of 1 second between each page request
        await delay(1000);
      }
  
      res.send('Anime data imported successfully');
    } catch (error) {
      console.error('Error importing anime data:', error);
      res.status(500).send('An error occurred while importing anime data');
    }
  });

router.get('/search', async (req, res) => {
    try {
      const searchQuery = req.query.query;
  
      // Query the database for anime titles matching the search query
      const searchResults = await AnimeModel.find({
        title: { $regex: searchQuery, $options: 'i' }, // Case-insensitive search
      });
  
      res.json(searchResults);
    } catch (error) {
      console.error('Error searching anime:', error);
      res.status(500).send('An error occurred while searching anime');
    }
  });

  router.get("/top-anime", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters (default to 10 if not provided)
  
    try {
      const count = await AnimeModel.countDocuments(); // Get the total count of documents in the collection
  
      const skip = (page - 1) * limit; // Calculate the number of documents to skip based on the page and limit
      const topAnime = await AnimeModel.find()
        .sort({ score: -1 })
        .skip(skip)
        .limit(limit);
  
      res.json({
        data: topAnime,
        page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      });
    } catch (error) {
      console.error("Error retrieving top anime:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/similar-anime/:animeId", async (req, res) => {
    try {
      const animeId = req.params.animeId;
  
      // Find the selected anime by ID
      const selectedAnime = await AnimeModel.findById(animeId);
  
      if (!selectedAnime) {
        return res.status(404).json({ error: "Anime not found" });
      }
  
      // Retrieve the genre of the selected anime
      const selectedGenre = Array.isArray(selectedAnime.genre)
        ? selectedAnime.genre
        : [selectedAnime.genre];
  
      // Find similar anime without pagination
      const similarAnime = await AnimeModel.find({
        $and: [
          { genre: { $in: selectedGenre } },
          { _id: { $ne: selectedAnime._id } }, // Exclude the selected anime by ID
        ],
      })
        .limit(50)
        .select("title images.jpg.image_url") // Include only title and images.jpg.image_url in the response
        .exec();
  
      res.json(similarAnime);
    } catch (error) {
      console.error("Error finding similar anime:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  router.get('/:animeID', async (req, res) => {
    try {
      const animeID = req.params.animeID;
      const anime = await AnimeModel.findById(animeID);
  
      if (!anime) {
        return res.status(404).json({ error: "Anime not found" });
      }
  
      res.json(anime);
    } catch (error) {
      console.error('Error retrieving anime:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  export {router as animeRouter};
