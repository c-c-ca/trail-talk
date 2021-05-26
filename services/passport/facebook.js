const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { facebookAppID, facebookAppSecret } = require('../../config/keys');
const { verifyCallback } = require('./passportConfig');

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookAppID,
      clientSecret: facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'email'],
      passReqToCallback: true,
      proxy: true,
    },
    verifyCallback('facebook')
  )
);
