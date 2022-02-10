export default app => {
  app.get('/api/test', (req, res) => {
    res.send({ test: 'route' });
  });
};