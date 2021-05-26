const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const {
  twitterConsumerKey,
  twitterConsumerSecret,
} = require('../../config/keys');
const { verifyCallback } = require('./passportConfig');

passport.use(
  new TwitterStrategy(
    {
      consumerKey: twitterConsumerKey,
      consumerSecret: twitterConsumerSecret,
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true,
      proxy: true,
    },
    verifyCallback('twitter')
  )
);
