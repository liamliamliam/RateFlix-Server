import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  passwordHash: String,
  googleId: String,
  picture: String,
  darkMode: { type: Boolean, default: true }
});

mongoose.model('Users', userSchema);