const passport = require('passport');

module.exports = router => {
  router.get('/verify/facebook', (req, res) => {
    req.session.returnTo = '/connect';
    res.redirect('/auth/facebook');
  });

  router.get(
    '/connect/facebook',
    passport.authorize('facebook', { scope: 'email' })
  );
};
