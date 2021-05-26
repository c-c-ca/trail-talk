import axios from 'axios';

const MIN_PASSWORD_LENGTH = 9;
const MIN_USERNAME_LENGTH = 6;

const MESSAGES = {
  EMAIL_INVALID: 'Invalid email address.',
  EMAIL_MISSING: 'You must enter an email.',
  CONFIRM_MISSING: 'Please confirm your password.',
  CONFIRM_MATCH: 'The Confirmation Password does not match.',
  PASSWORD_LENGTH: `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`,
  PASSWORD_MISSING: 'You must enter a password.',
  USERNAME_ALNUM: 'Username must contain alphanumeric characters.',
  USERNAME_INVALID: 'Invalid username.',
  USERNAME_UNAVAILABLE: 'Username has already been taken.',
  USERNAME_LENGTH: `Username must contain at least ${MIN_USERNAME_LENGTH} alphanumeric characters.`,
  USERNAME_MISSING: 'You must enter a username.',
  USERNAME_NOT_FOUND: 'Username cannot be found.',
  USERNAME_OR_EMAIL_INVALID: 'Invalid username or email.',
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const composeValidators =
  (...validators) =>
  value =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const requireField = message => value => value ? undefined : message;

const minimumLength = (len, message) => value =>
  value.length < len ? message : undefined;

const DEBOUNCE_DELAY = 500;
let lastRequest;

const usernameFound = async username => {
  lastRequest = Date.now();

  const debounce = fn =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(Date.now() - lastRequest >= DEBOUNCE_DELAY ? fn() : null);
      }, DEBOUNCE_DELAY);
    });

  const res = await debounce(() => {
    console.log('requesting', username);
    return axios.post('/api/username-exists', { username });
  });

  if (!res) return false;

  const { data } = res;
  return data && data.found;
};

const usernameNotFound = async username => {
  if (!(await usernameFound(username))) {
    return MESSAGES.USERNAME_NOT_FOUND;
  }
};

const usernameAvailable = async username => {
  if (await usernameFound(username)) {
    return MESSAGES.USERNAME_UNAVAILABLE;
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

export const validateUsernameUpdate = existingUsername =>
  composeValidators(validateUsernameLogin, username => {
    if (username != existingUsername) {
      return usernameAvailable(username);
    }
  });

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

export const validateConfirm = composeValidators(
  requireField(MESSAGES.CONFIRM_MISSING)
);

export const validatePasswordsMatch = ({ password, confirm }) => {
  if (password != confirm) {
    return { confirm: MESSAGES.CONFIRM_MATCH };
  }
};

export const validateUsernamePasswordRecovery = usernameOrEmail => {
  if (
    validateEmail(usernameOrEmail) &&
    validateUsernameLogin(usernameOrEmail)
  ) {
    return MESSAGES.USERNAME_OR_EMAIL_INVALID;
  }
};

export const composeFormValidators = (formValues, formValidators) =>
  formValidators.reduce(
    (errors, validator) => ({ ...errors, ...validator(formValues) }),
    {}
  );
