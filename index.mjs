import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import './models/index.mjs';
import './services/passport.mjs';
import routes from './routes/index.mjs';

mongoose.connect(process.env.MONGODB_URI, console.log('Connected to MongoDB'));

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

const PORT = 5500;
app.listen(PORT, console.log(`Running on port ${PORT}`));