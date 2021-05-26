const mongoose = require('mongoose');
const User = mongoose.model('users');
const Ticket = mongoose.model('tickets');
const DuplicateEmailError = require('../../utils/DuplicateEmailError');
const findUserByEmail = require('../../utils/findUserByEmail');

const STRATEGIES = ['facebook', 'github', 'google', 'local', 'twitter'];

module.exports.verifyCallback =
  strategyName => (req, accessToken, refreshToken, profile, done) => {
    const {
      emails: [{ value: email }],
    } = profile;

    const createAccount = () => ({
      id: profile.id,
      token: accessToken,
      email,
    });

    const createTicket = async () =>
      await new Ticket({
        email,
        strategy: strategyName,
        profileId: profile.id,
        isVerified: true,
      }).save();

    const findUserByAccountId = async () =>
      await User.findOne({
        [`${strategyName}.id`]: profile.id,
      });

    const signupMethodsForUser = user => {
      const userObject = user.toObject();
      return Object.keys(userObject).filter(
        key => STRATEGIES.includes(key) && userObject[key]
      );
    };

    /**
     * Determine whether the User has been registered previously. If the User
     * has not been registered using this strategy before, look for an account
     * that has the same email.
     */
    const findUserOrCreateTicket = async done => {
      // The User has previoulsy registered using this strategy
      const userByAccountId = await findUserByAccountId();
      if (userByAccountId) return done(null, userByAccountId);

      const userByEmail = await findUserByEmail(email);
      if (userByEmail)
        return done(
          new DuplicateEmailError(
            'An account for this email address already exists',
            409,
            signupMethodsForUser(userByEmail),
            email
          )
        );

      req.token = (await createTicket()).token;
      return done(null);

      // done(
      //   null,
      //   await new User({
      //     usernameToken: generateToken(),
      //     [strategyName]: createAccount(accessToken, profile),
      //     email,
      //   }).save()
      // );
    };

    const connectUser = async ({ user }, accessToken, profile, done) => {
      user[strategyName] = createAccount(accessToken, profile);
      done(null, await user.save());
    };

    try {
      req.user
        ? connectUser(req, accessToken, profile, done)
        : findUserOrCreateTicket(done);
    } catch (err) {
      done(err);
    }
  };
