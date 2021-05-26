module.exports = (req, res, next) => {
  const { usernameToken } = req.user;
  if (usernameToken) {
    req.logout();
    return res.redirect(`/create-username?token=${usernameToken}`);
  }
  next();
};
