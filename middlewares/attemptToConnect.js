const STRATEGIES = ['facebook', 'github', 'google', 'local', 'twitter'];

module.exports = (req, res, next) => {
  // const signupMethodsForUser = user => {
  //   const userObject = user.toObject();
  //   return STRATEGIES.filter(strategy => !userObject[strategy]).join(',');
  // };

  if (req.session.returnTo == '/connect') {
    // const { user } = req;
    // const signupMethods = signupMethodsForUser(user);

    delete req.session.returnTo;
    return res.redirect('/connect');
    // return res.redirect(
    //   `${returnTo}?signupMethods=${signupMethods}&email=${user.email}`
    // );
  }
  next();
};
