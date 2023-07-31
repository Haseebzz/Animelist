import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import axios from 'axios';
const app = express()
app.use(express.json());
dotenv.config();
app.use(cors());
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { animeRouter } from "./routes/anime.js";
import { userRouter } from "./routes/user.js";
import { commentRouter } from "./routes/comment.js";
import { scoreRouter } from "./routes/score.js";
import { animelistRouter } from "./routes/animeList.js";
mongoose.connect(
    "mongodb+srv://chaudhuryhaseeb35:anime60@cluster0.q3smnwd.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );




  app.use("/auth",userRouter);
  app.use("/anime", animeRouter);
  app.use("/comment", commentRouter)
  app.use("/score", scoreRouter)
  app.use("/animelist", animelistRouter)

  
app.get("/", (req,res)=> {
    res.send("server is running")
})


app.listen(4000, () => {
    console.log("everything is running")
} )