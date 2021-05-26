const SIGN_UP_METHODS = ['facebook', 'github', 'google', 'local', 'twitter'];

module.exports = user => {
  const userObject = user.toObject();
  return SIGN_UP_METHODS.filter(signupMethod => userObject[signupMethod]);
};
