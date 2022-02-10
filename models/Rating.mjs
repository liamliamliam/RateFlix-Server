import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = new Schema({
  imdbId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  notes: String,
  dateCreated: Date,
  dateModified: Date
});

mongoose.model('Ratings', ratingSchema);