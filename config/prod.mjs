export default {
  omdb: {
    key: process.env.OMDB_KEY
  },
  tmdb: {
    v3: {
      url: process.env.TMDB_API3_URL,
      key: process.env.TMDB_API3_KEY
    },
    v4: {
      url: process.env.TMDB_API4_URL,
      key: process.env.TMDB_API4_KEY
    }
  },
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  cookie: {
    key: process.env.COOKIE_KEY
  }
};