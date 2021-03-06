import authRoutes from './authRoutes.mjs';
import movieRoutes from './movieRoutes.mjs';
import ratingRoutes from './ratingRoutes.mjs';
import statsRoutes from './statsRoutes.mjs';
import searchRoutes from './searchRoutes.mjs';
import testRoutes from './testRoutes.mjs';

const ROUTE_PREFIX = '';

export default app => {
  authRoutes(app);
  searchRoutes(app, ROUTE_PREFIX);
  movieRoutes(app, ROUTE_PREFIX);
  ratingRoutes(app, ROUTE_PREFIX);
  statsRoutes(app, ROUTE_PREFIX);
  testRoutes(app, ROUTE_PREFIX);
};

