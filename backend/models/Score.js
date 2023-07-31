import mongoose from 'mongoose';

const scoreSchema = mongoose.Schema({
  score: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    
  }
});

export const ScoreModel = mongoose.model('Score', scoreSchema);