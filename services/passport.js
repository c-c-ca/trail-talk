const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const generateToken = require('../utils/generateToken');
const { googleClientID, googleClientSecret } = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) =>
  done(null, await User.findById(id))
);

const profileToEmail = ({ emails: [{ value: email }] }) => email;

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profileToEmail(profile);

      const user = await User.findOne({ email });
      if (!user.isActive) {
        await User.findByIdAndDelete(user.id);
      } else {
        return done(null, user);
      }

      done(
        null,
        await new User({
          email,
          usernameToken: generateToken(),
        }).save()
      );
    }
  )
);

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
