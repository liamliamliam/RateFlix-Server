import axios from 'axios';
import mongoose from 'mongoose';
import keys from '../config/keys.mjs';
import requireLogin from '../middlewares/requireLogin.mjs';

const Rating = mongoose.model('Ratings');

export default (app, ROUTE_PREFIX) => {

  app.get(
    `${ROUTE_PREFIX}/search`,
    requireLogin, 
    async (req, res) => {
      try {
        const { page, query } = req.query;
        const url = `${keys.tmdb.v3.url}/search/movie?api_key=${keys.tmdb.v3.key}&query=${query}&page=${page || 1}`;
        const tmdb = await axios.get(url);
        const search = { ...tmdb.data, query };
        if (!!search.results.length) {
          search.results = await Promise.all(
            search.results.map(async movie => {
              return {
                ...movie,
                rating: await Rating.findOne({
                  movie_id: movie.id,
                  user_id: req.user._id
                })
              };
            })
          );
        }
        return res.send(search);
      } catch (err) {
        return res.send(err);
      }
    }
  );
  
};
