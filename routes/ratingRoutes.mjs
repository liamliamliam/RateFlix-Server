import mongoose from 'mongoose';

const Rating = mongoose.model('Ratings');

export default (app, ROUTE_PREFIX) => {

  app.get(`${ROUTE_PREFIX}/rating/:imdbId/:userId`, async (req, res) => {
    console.log('[get]api/rating');
    const { tmdbId, userId } = req.params;
    const rating = await Rating.findOne({ tmdbId, userId });
    if (rating) return res.send(rating);
    return res.send(null);
  });

  app.get(`${ROUTE_PREFIX}/myratings/`, async (req, res) => {
    console.log('[get]api/myratings - req.query:', req.query);
    // const score_range = req.query.sr.split(',');
    // const year_range = req.query.yr.split(',');
    // const date_created_range = req.query.dcr.split(',').map(d => new Date(d));
    // const date_modified_range = req.query.dmr.split(',').map(d => new Date(d));
    // console.log(date_created_range, date_modified_range);
    const ratings = await Rating.find(
      {
        user_id: req.user._id,
        // score: { $gte: score_range[0], $lte: score_range[1] },
        // dateCreated: { $gte: date_created_range[0], $lte: date_created_range[1] },
        // dateModified: { $gte: date_modified_range[0], $lte: date_modified_range[1] },
        // 'movie.year': { $gte : year_range[0], $lte: year_range[1] }
      }
    ).sort({ score: 'desc' });
    if (ratings) return res.send(ratings);
    return res.send(null);
  });

  app.post(`${ROUTE_PREFIX}/rating`, async (req, res) => {
    const { movie_id, user_id } = req.body;
    console.log('[post]api/rating - req.body:', req.body);
    const existingRating = await Rating.findOne({ movie_id, user_id });
    if (existingRating) {
      const updatedRating = await Rating.findOneAndUpdate(
        { movie_id, user_id },
        { ...req.body, dateModified: Date.now() },
        { new: true }
      );
      return res.send(updatedRating);
    }
    const newRating = await new Rating({ ...req.body, dateCreated: Date.now(), dateModified: Date.now() }).save()
    return res.send(newRating);
  });

};
