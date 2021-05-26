module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send({ error: 'Login required' });
  }
  next();
};
