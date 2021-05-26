const mongoose = require('mongoose');
const { Schema } = mongoose;
const generateToken = require('../utils/generateToken');

const { CREATE_ACCOUNT } = require('./types');

const ticketSchema = new Schema({
  email: {
    type: String,
  },
  strategy: {
    type: String,
  },
  profileId: {
    type: String,
  },
  token: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  action: {
    type: String,
    default: CREATE_ACCOUNT,
  },
});

ticketSchema.pre('save', function () {
  // Prevent overwriting the token
  if (!this.token) {
    this.token = generateToken();
  }
});

mongoose.model('tickets', ticketSchema);
