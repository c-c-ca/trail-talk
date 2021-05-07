const MIN_PASSWORD_LENGTH = 9;
const MIN_USERNAME_LENGTH = 6;

const MESSAGES = {
  EMAIL_INVALID: 'Invalid email address.',
  EMAIL_MISSING: 'You must enter an email.',
  PASSWORD_LENGTH: `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`,
  PASSWORD_MISSING: 'You must enter a password.',
  USERNAME_ALNUM: 'Username must contain alphanumeric characters.',
  USERNAME_INVALID: 'Invalid username.',
  USERNAME_LENGTH: `Username must contain at least ${MIN_USERNAME_LENGTH} alphanumeric characters.`,
  USERNAME_MISSING: 'You must enter a username.',
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const requireField = message => value => (value ? undefined : message);

const minimumLength = (len, message) => value =>
  value.length < len ? message : undefined;

const usernameAvailable = async value => {
  await sleep(1000);
  const usernames = ['adam'];

  if (usernames.includes(value)) {
    return MESSAGES.USERNAME_INVALID;
  }
};

const isAlphaNumeric = str => {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

const validateAlphaNumeric = message => value =>
  isAlphaNumeric(value) ? undefined : message;

const emailFormat = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ? undefined
    : MESSAGES.EMAIL_INVALID;

export const validateUsernameLogin = composeValidators(
  requireField(MESSAGES.USERNAME_MISSING),
  validateAlphaNumeric(MESSAGES.USERNAME_ALNUM),
  minimumLength(MIN_USERNAME_LENGTH, MESSAGES.USERNAME_LENGTH)
);

export const validateUsername = composeValidators(
  validateUsernameLogin,
  usernameAvailable
);

export const validateEmail = composeValidators(
  requireField(MESSAGES.EMAIL_MISSING),
  emailFormat
);

export const validatePassword = composeValidators(
  requireField(MESSAGES.PASSWORD_MISSING),
  minimumLength(MIN_PASSWORD_LENGTH, MESSAGES.PASSWORD_LENGTH)
);
