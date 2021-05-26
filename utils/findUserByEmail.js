const mongoose = require('mongoose');
const User = mongoose.model('users');

const STRATEGIES = ['facebook', 'github', 'google', 'local', 'twitter'];

module.exports = async email =>
  await User.findOne({
    $or: STRATEGIES.map(strategy => ({ [`${strategy}.email`]: email })),
  });
