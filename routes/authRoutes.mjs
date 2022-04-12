import passport from "passport";
import mongoose from 'mongoose';

const User = mongoose.model('Users');

export default app => {

  app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, passwordHash, darkMode } = req.body;
    const existingUser = await User.findOne({ eamil });
    if (existingUser) res.status(400).send('Email already exists');
    const newUser = await new User({ firstName, lastName, email, passwordHash, darkMode }).save();
    passport.authenticate('local');
  });

  app.get('/auth/session', (req, res) => {
    console.log('/auth/session - req.user:', req.user);
    res.send(req.user);
  });

  app.put('/auth/user', async (req, res) => {
    const { firstName, lastName, email, passwordHash, darkMode } = req.body;
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true });
    console.log('/auth/user/ - user:', user);
    res.send(user);
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('http://localhost:3000');
    }
  );
  
};