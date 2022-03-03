import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = new Schema({
  movie_id: { type: Number, required: true },
  movie: {
    id: { type: Number, required: true },
    backdrop: String,
    poster: String,
    release_date: Date,
    title: {type: String, required: true },
    vote_average: Number,
    vote_count: Number
  },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  notes: String,
  dateCreated: Date,
  dateModified: Date
});

mongoose.model('Ratings', ratingSchema);