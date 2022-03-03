import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import keys from './config/keys.mjs';
import './models/index.mjs';
import './services/passport.mjs';
import routes from './routes/index.mjs';

mongoose.connect(keys.mongodb.uri, console.log('Connected to MongoDB'));

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookie.key]
  })
);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

const PORT = 5500;
app.listen(PORT, console.log(`Running on port ${PORT}`));