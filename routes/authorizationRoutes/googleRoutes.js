const passport = require('passport');

module.exports = router => {
  router.get('/verify/google', (req, res) => {
    req.session.returnTo = '/connect';
    res.redirect('/auth/google');
  });

  router.get(
    '/connect/google',
    passport.authorize('google', { scope: ['profile', 'email'] })
  );

  // the callback after google has authorized the user
  // router.get(
  //   '/connect/google/callback',
  //   passport.authorize('google', {
  //     successRedirect: '/profile',
  //     failureRedirect: '/',
  //   })
  // );
};
