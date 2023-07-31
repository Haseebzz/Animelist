import mongoose from "mongoose";
import { CommentModel } from "./Comment.js";
import { ScoreModel } from "./Score.js";
const animeSchema = mongoose.Schema({
  mal_id: {
    type: Number,
  },
  url: {
    type: String,
  },
  images: {
    jpg: {
      image_url: String,
      small_image_url: String,
      large_image_url: String,
    },
    webp: {
      image_url: String,
      small_image_url: String,
      large_image_url: String,
    },
  },
  trailer: {
    youtube_id: String,
    url: String,
    embed_url: String,
    images: {
      image_url: String,
      small_image_url: String,
      medium_image_url: String,
      large_image_url: String,
      maximum_image_url: String,
    },
  },
  approved: Boolean,
  titles: [
    {
      type: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],
  title: {
    type: String,
  },
  title_english: {
    type: String,
  },
  title_japanese: {
    type: String,
  },
  title_synonyms: [String],
  type: {
    type: String,
  },
  source: {
    type: String,
  },
  episodes: {
    type: Number,
  },
  status: {
    type: String,
  },
  airing: {
    type: Boolean,
  },
  aired: {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    prop: {
      from: {
        day: Number,
        month: Number,
        year: Number,
      },
      to: {
        day: Number,
        month: Number,
        year: Number,
      },
    },
    string: String,
  },
  duration: {
    type: String,
  },
  rating: {
    type: String,
  },
  score: {
    type: Number,
  },
  scored_by: {
    type: Number,
  },
  rank: {
    type: Number,
  },
  popularity: {
    type: Number,
  },
  members: {
    type: Number,
  },
  favorites: {
    type: Number,
  },
  synopsis: {
    type: String,
  },
  background: {
    type: String,
  },
  season: {
    type: String,
  },
  year: {
    type: Number,
  },
  broadcast: {
    day: String,
    time: String,
    timezone: String,
    string: String,
  },
  producers: [
    {
      mal_id: {
        type: Number,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  licensors: [
    {
      mal_id: {
        type: Number,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  studios: [
    {
      mal_id: {
        type: Number,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  genres: [
    {
      mal_id: {
        type: Number,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  themes: [
    {
      mal_id: {
        type: Number,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  demographics: [
    {
      mal_id: {
        type: Number,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  comments: [CommentModel.schema], // Reference the CommentModel schema
  userScores: [ScoreModel.schema],
  totalScore: {
    type: Number,
    default: 0
  },
  totalVotes: {
    type: Number,
    default: 0
  }
});

export const AnimeModel = mongoose.model("anime", animeSchema);
