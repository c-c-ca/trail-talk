const passport = require('passport');

module.exports = strategy => (req, res, next) => {
  passport.authenticate(strategy, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(`/username?token=${req.token}`);
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      if (req.session.returnTo == '/connect') {
        delete req.session.returnTo;
        return res.redirect('/connect');
      }
      return res.redirect('/');
    });
  })(req, res, next);
};
