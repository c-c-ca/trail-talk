const passport = require('passport');
const createAuthCallback = require('./createAuthCallback');

module.exports = router => {
  router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
  );

  router.get('/auth/facebook/callback', createAuthCallback('facebook'));
};
