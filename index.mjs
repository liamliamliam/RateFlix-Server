import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import './models/index.mjs';
import './services/passport.mjs';
import routes from './routes/index.mjs';

mongoose.connect(process.env.MONGODB_URI, console.log('Connected to MongoDB'));

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['https://rateflix.vercel.app', 'http://localhost:3000']
  })
);

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
    domain: 'rateflix.lol'
  })
);
app.use(passport.initialize());
app.use(passport.session());

routes(app);
app.get('/api/env', (req, res) => res.json({ env: process.env.NODE_ENV }));

const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log(`Running on port ${PORT}`));
