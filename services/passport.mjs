import passport from 'passport';
import passportGoogleOauth20 from 'passport-google-oauth20';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const GoogleStrategy = passportGoogleOauth20.Strategy;
const LocalStrategy = passportLocal.Strategy;

const User = mongoose.model('Users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);
      const { _json } = profile;
      const user = await new User({ 
        firstName: _json.given_name,
        lastName: _json.family_name,
        email: _json.email,
        googleId: profile.id,
        picture: _json.picture
      }).save();
      done(null, user);
    }
  )
);

passport.use(new LocalStrategy(
  async (username, password, done) => {
    console.log('Using LocalStrategy. username:', username);
    const user = await User.findOne({ email: username });
    if (user) {
      const pwMatch = await bcrypt.compare(password, user.passwordHash);
      if (pwMatch) return done(null, user);
    }

    // User.findOne({ email: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  }
));