const passport = require('passport');
const createAuthCallback = require('./createAuthCallback');

module.exports = router => {
  router.get('/auth/twitter', passport.authenticate('twitter'));

  router.get('/auth/twitter/callback', createAuthCallback('twitter'));
};
