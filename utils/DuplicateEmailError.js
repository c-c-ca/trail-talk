const ExpressError = require('./ExpressError');

class DuplicateEmailError extends ExpressError {
  constructor(message, statusCode, signupMethods, email) {
    super(message, statusCode);
    this.signupMethods = signupMethods;
    this.email = email;
  }
}

module.exports = DuplicateEmailError;
