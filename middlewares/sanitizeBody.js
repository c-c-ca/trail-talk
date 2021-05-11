const sanitizeBody = req =>
  Object.entries(req.body).reduce(
    (body, [key, value]) => ({ ...body, [key]: req.sanitize(value) }),
    {}
  );

module.exports = (req, res, next) => {
  req.body = sanitizeBody(req);
  next();
};
