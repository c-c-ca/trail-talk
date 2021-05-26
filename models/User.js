const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
  },
  github: {
    id: String,
    token: String,
    email: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
  },
  twitter: {
    id: String,
    token: String,
    email: String,
  },
  local: {
    email: String,
    token: String,
  },
  primaryEmail: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);

mongoose.model('users', userSchema);
