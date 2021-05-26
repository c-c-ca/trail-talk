const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { githubClientID, githubClientSecret } = require('../../config/keys');
const { verifyCallback } = require('./passportConfig');

passport.use(
  new GitHubStrategy(
    {
      clientID: githubClientID,
      clientSecret: githubClientSecret,
      callbackURL: '/auth/github/callback',
      passReqToCallback: true,
      proxy: true,
    },
    verifyCallback('github')
  )
);
