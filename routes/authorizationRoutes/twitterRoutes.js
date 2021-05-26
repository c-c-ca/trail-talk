const passport = require('passport');

module.exports = router => {
  router.get('/verify/twitter', (req, res) => {
    req.session.returnTo = '/connect';
    res.redirect('/auth/twitter');
  });

  router.get('/connect/twitter', passport.authorize('twitter'));
};
