import mongoose from 'mongoose';
import { sub } from 'date-fns';
import { dateCreatedTotals } from './aggregations/dateCreatedTotals.mjs';

const Rating = mongoose.model('Ratings');

const last_ratings = async (time, user_id) => {
  if (user_id)
    return await Rating.count({
      user_id: user_id,
      dateCreated: { $gte: sub(new Date(), time) }
    });
  return await Rating.count({ dateCreated: { $gte: sub(new Date(), time) } });
};

const general_stats = async () => {
  return {
    test: 123,
    timestamp: new Date().toISOString(),
    ratings: {
      totals: {
        all: {
          count: await Rating.count({}),
          last: {
            day: await last_ratings({ days: 1 }),
            week: await last_ratings({ weeks: 1 }),
            month: await last_ratings({ months: 1 })
          }
        }
      },
      graph: {
        week: await Rating.aggregate(dateCreatedTotals('week', -1)),
        month: await Rating.aggregate(dateCreatedTotals('month', -1)),
        year: await Rating.aggregate(dateCreatedTotals('year', -1))
      }
    }
  };
};

export default (app, ROUTE_PREFIX) => {
  app.get(`${ROUTE_PREFIX}/stats`, async (req, res) => {
    //console.log('[get]api/stats');

    const stats = await general_stats();

    if (req.user) {
      stats.ratings.totals.mine = {
        count: await Rating.count({ user_id: req.user._id }),
        last: {
          day: await last_ratings({ days: 1 }, req.user._id),
          week: await last_ratings({ weeks: 1 }, req.user._id),
          month: await last_ratings({ months: 1 }, req.user._id)
        }
      };
    }

    return res.send(stats);
  });
};
