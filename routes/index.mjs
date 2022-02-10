import authRoutes from './authRoutes.mjs';
import movieRoutes from './movieRoutes.mjs';
import ratingRoutes from './ratingRoutes.mjs';
import testRoutes from './testRoutes.mjs';

const ROUTE_PREFIX = '/api';

export default app => {
  authRoutes(app);
  movieRoutes(app, ROUTE_PREFIX);
  ratingRoutes(app, ROUTE_PREFIX);
  testRoutes(app, ROUTE_PREFIX);
};

