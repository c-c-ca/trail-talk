const passport = require('passport');
const createAuthCallback = require('./createAuthCallback');

module.exports = router => {
  router.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  router.get('/auth/google/callback', createAuthCallback('google'));
};
