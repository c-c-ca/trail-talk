const passport = require('passport');
const mongoose = require('mongoose');

require('./facebook');
require('./github');
require('./google');
require('./local');
require('./twitter');

const User = mongoose.model('users');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) =>
  done(null, await User.findById(id))
);
