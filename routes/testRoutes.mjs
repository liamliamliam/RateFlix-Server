export default app => {
  app.get('/test', (req, res) => {
    res.send({ test: 'route' });
  });
};