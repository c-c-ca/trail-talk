const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');

const User = mongoose.model('users');

passport.use(new LocalStrategy(User.authenticate()));

// Remove these?

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
