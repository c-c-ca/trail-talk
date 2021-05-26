const passport = require('passport');

module.exports = router => {
  router.get('/verify/github', (req, res) => {
    req.session.returnTo = '/connect';
    res.redirect('/auth/github');
  });

  router.get(
    '/connect/github',
    passport.authorize('github', { scope: ['user:email'] })
  );
};
