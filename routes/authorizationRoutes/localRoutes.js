const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Ticket = mongoose.model('tickets');

const SIGN_UP_METHODS = ['facebook', 'github', 'google', 'twitter'];

const emailsForUser = user => {
  const emails = [];
  Object.entries(user.toObject()).forEach(([key, value]) => {
    if (
      Object.keys(value).length === 0 &&
      value.constructor === Object &&
      value.email
    ) {
      emails.push(email);
    }
  });
  return emails;
};

const copyAndSaveUser = async (user, email, password) => {
  const oldUserObject = user.toObject();
  const { username, primaryEmail } = oldUserObject;
  await User.findByIdAndDelete(user.id);

  const newUser = await User.register(
    new User({
      username,
      primaryEmail,
      local: { email },
    }),
    password
  );

  Object.entries(oldUserObject).forEach(([key, value]) => {
    if (SIGN_UP_METHODS.includes(key)) {
      newUser[key] = value;
    }
  });
  newUser.save();
};

module.exports = router => {
  router.get(
    '/verify/local',
    passport.authorize('local', {
      failureRedirect: '/verify',
      successRedirect: '/connect',
    })
  );

  /**
   * Finds the Ticket that is associated with the User that is currently
   * logged in and creates the local subdocument using the email associated
   * with that ticket.
   */
  router.post(
    '/connect/local',
    async (req, res) => {
      const { password } = req.body;

      const ticket = await Ticket.findOne({ user: req.user._id });
      if (!ticket) {
        return res.send({
          success: false,
          message: 'An email has not been verified for this account',
        });
      }

      await copyAndSaveUser(req.user, ticket.email, password);
      await Ticket.findByIdAndDelete(ticket.id);
      res.send({ success: true });
    }
    // passport.authorize('local', { failureRedirect: '/connect' })
    // destroy old user and create a new one
    // copy all old accounts over to new user
    // front-end should redirect after response
  );
};
