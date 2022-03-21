import mongoose from 'mongoose';
import axios from 'axios';

const Rating = mongoose.model('Ratings');
const base_url = 'http://image.tmdb.org/t/p/';

export default (app, ROUTE_PREFIX) => {

  app.get(`${ROUTE_PREFIX}/movie/:id`, async (req, res) => {
    const url = `${process.env.TMDB_API3_URL}/movie/${req.params.id}?append_to_response=credits,videos&api_key=${process.env.TMDB_API3_KEY}`;
    const { data } = await axios.get(url);
    data.rating = await Rating.findOne({ movie_id: data.id, user_id: req.user._id });
    data.imagePaths = {
      backdrop: {
        original: `${base_url}original${data.backdrop_path}`
      },
      poster: {
        tiny: `${base_url}w92${data.poster_path}`,
        normal: `${base_url}w342${data.poster_path}`,
        original: `${base_url}original${data.poster_path}`
      }
    };
    const jobs = [
      { prop: 'director', name: 'Director' },
      { prop: 'writer', name: 'Story' },
      { prop: 'screenplay', name: 'Screenplay' }
    ]
    jobs.map(job => {
      const job_list = data.credits.crew.filter(person => person.job === job.name);
      data[job.prop] = job_list.length ? job_list.map(j => j.name).join(', ') : '';
    });
    res.send(data);
  });
  
};
