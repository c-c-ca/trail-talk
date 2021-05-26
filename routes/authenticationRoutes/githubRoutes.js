const passport = require('passport');
const createAuthCallback = require('./createAuthCallback');

module.exports = router => {
  router.get(
    '/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
  );

  router.get('/auth/github/callback', createAuthCallback('github'));
};
