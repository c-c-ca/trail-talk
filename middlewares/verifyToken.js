const mongoose = require('mongoose');
const Ticket = mongoose.model('tickets');

module.exports = async (req, res, next) => {
  const { token } = req.query;
  const ticket = await Ticket.findOne({ token });

  if (!ticket) {
    return res.redirect('/');
  }

  ticket.isVerified = true;
  await ticket.save();
  next();
};
