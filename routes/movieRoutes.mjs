import mongoose from 'mongoose';
import axios from 'axios';
import keys from '../config/keys.mjs';
import requireLogin from '../middlewares/requireLogin.mjs';

const Rating = mongoose.model('Ratings');

export default (app, ROUTE_PREFIX) => {
  app.get(
    `${ROUTE_PREFIX}/movie/search/:searchString`,
    requireLogin,
    async (req, res) => {
      const searchResults = { status: false, movies: [], msg: '' };
      try {
        const omdbResponse = await axios.get(
          `http://www.omdbapi.com/?apikey=${keys.omdbKey}&type=movie&s=${req.params.searchString}`
        );
        //console.log('search res:', omdbResponse.data);
        const { Response, Search, Error } = omdbResponse.data;
        searchResults.status = Response === 'True';
        if (searchResults.status) {
          if (!!Search && !!Search.length) {
            searchResults.movies = await Promise.all(Search.map(async (movie, i) => {
              return {
                ...movie, 
                rating: await Rating.findOne({ imdbId: movie.imdbID, userId: req.user._id })
              };
            }));
            return res.send(searchResults);
          }
        } else {
          searchResults.msg = Error;
        }
      } catch (err) {
        searchResults.msg = err;
        return res.send(searchResults);
      }
    }
  );
  app.get(`${ROUTE_PREFIX}/movie/:imdbid`, async (req, res) => {
    const omdbResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${keys.omdbKey}&i=${req.params.imdbid}`
    );
    res.send(omdbResponse.data);
  });
  app.post(`${ROUTE_PREFIX}/movie`, (req, res) => {});
};

// Pulp Fiction (tt0110912)

// Happy Gilmore (tt0116483)
