const { containsProfanity } = require('../services/sightengine');

module.exports = async (req, res, next) => {
  if (await containsProfanity(req.body.username)) {
    return res.send({
      success: false,
      message: 'Invalid username',
    });
  }

  next();
};
