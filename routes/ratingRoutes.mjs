import mongoose from 'mongoose';

const Rating = mongoose.model('Ratings');

export default (app, ROUTE_PREFIX) => {
  app.get(`${ROUTE_PREFIX}/rating/:imdbId/:userId`, async (req, res) => {
    console.log('[get]api/rating');
    const { imdbId, userId } = req.params;
    const rating = await Rating.findOne({ imdbId, userId });
    if (rating) return res.send(rating);
    return res.send(null);
  });

  app.post(`${ROUTE_PREFIX}/rating`, async (req, res) => {
    const { imdbId, userId } = req.body;
    console.log('[post]api/rating - req.body:', req.body);
    const existingRating = await Rating.findOne({ imdbId, userId });
    if (existingRating) {
      const updatedRating = await Rating.findOneAndUpdate(
        { imdbId, userId },
        { ...req.body, dateModified: Date.now() },
        { new: true }
      );
      return res.send(updatedRating);
    }
    const newRating = await new Rating({ ...req.body, dateCreated: Date.now(), dateModified: Date.now() }).save()
    return res.send(newRating);
  });

};
