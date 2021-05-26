const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleClientID, googleClientSecret } = require('../../config/keys');
const { verifyCallback } = require('./passportConfig');

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
      proxy: true,
    },
    verifyCallback('google')
  )
);
