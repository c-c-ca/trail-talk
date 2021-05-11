const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  // googleId: String,
  twitterId: String,
  username: {
    type: String,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
  },
  usernameToken: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);

mongoose.model('users', userSchema);
