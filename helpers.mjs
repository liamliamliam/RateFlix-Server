export const GC = {
  siteURL: {
    dev: 'http://localhost:3000',
    prod: 'https://www.rateflix.lol',
    now: () => GC.siteURL[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']
  }
};