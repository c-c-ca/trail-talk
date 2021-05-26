const { Router } = require('express');
const router = Router();

require('./facebookRoutes')(router);
require('./githubRoutes')(router);
require('./googleRoutes')(router);
require('./localRoutes')(router);
require('./twitterRoutes')(router);

const mongoose = require('mongoose');
const User = mongoose.model('users');
const Ticket = mongoose.model('tickets');
const { RECOVER_PASSWORD, RESET_EMAIL } = require('../../models/types');

const validateUsername = require('../../middlewares/validateUsername');
const verifyToken = require('../../middlewares/verifyToken');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const {
  sendVerificationEmail,
  sendPasswordRecoveryEmail,
  sendEmailCollisionEmail,
  sendEmailResetEmail,
} = require('../../services/sendgrid');
const findUserByEmail = require('../../utils/findUserByEmail');
const findSignupMethodsForUser = require('../../utils/findSignupMethodsForUser');

router.get('/api/current-user', (req, res) => {
  res.send(req.user);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/**
 * Initial step in creating a local account.
 *
 * Handles the following situations:
 * (1) Email provided is associated with a pre-existing account.
 * (2) This is the first time signing in with the service - no account exists for that email.
 * (3) The user is currently signed in and is attempting to connect a local account to their pre-existing account
 *
 * Create a Ticket for the email provided in the body of the POST request.
 * Associate a User with the Ticket if a user has already been registered
 * for that email or if a User is currently signed in.
 */
router.post('/api/create-ticket', async (req, res) => {
  const { email } = req.body;

  // Check that when a logged in user is attempting to connect an email that it
  // has not already been associated with another account (i.e. check whether
  // they already created another account with the same email)
  const userByEmail = await findUserByEmail(email);
  if (req.user && userByEmail && req.user._id !== userByEmail._id) {
    sendEmailCollisionEmail(email, req.headers.host, req.user.username);
  } else {
    const user = req.user || userByEmail;
    sendVerificationEmail(
      email,
      req.headers.host,
      (
        await new Ticket({
          email,
          user: user && user._id, // user field is null if a User is not found
          strategy: 'local',
        }).save()
      ).token
    );
  }

  res.send({ success: true });
});

/**
 * Find the Ticket associated with the token provided in the query string.
 * Remove all other Tickets that are associated with the same User or have
 * the same email as the one associated with that Ticket.
 */
router.get('/verify-email', verifyToken, async (req, res) => {
  const { token } = req.query;
  const ticket = await Ticket.findOne({ token });

  // A token will be used to associate the username and pasword with the
  // provided email when the User is created
  const { email } = ticket;
  const user =
    (ticket.user && (await User.findById(ticket.user))) ||
    (await findUserByEmail(email));
  if (!user) {
    return res.redirect(`/account?token=${token}`);
  }

  // Ensure that when a User attempts to connect the email of the last
  // Ticket that was verified (i.e. clicked) will be used
  await Ticket.deleteMany({
    $and: [{ $or: [{ email }, { user }] }, { _id: { $ne: ticket._id } }],
  });

  // Send the user directly to the connect page if they are already logged in
  if (req.user) {
    return res.redirect('/connect');
  }

  res.redirect(
    encodeURI(
      `/verify?signupMethods=${findSignupMethodsForUser(user).join(',')}`
    )
  );
});

/**
 * Verify that a Ticket associated with the current User exists and
 * has been verified. The User will need to click the Verify Email
 * link in their inbox before the email has been registered.
 *
 * This is used to determine which stage the User is currently in during
 * the process of connecting a local account to a pre-existing account.
 * See the Connect component to see how it is used.
 */
router.post('/api/registered-email', isLoggedIn, async (req, res) => {
  const ticket = await Ticket.findOne({ user: req.user, isVerified: true });
  res.send({ email: ticket && ticket.email });
});

/**
 * Create a User with the username provided in the body of the request.
 *
 * Requests will be made to this round in the following situations:
 *
 * (1) A user has just verified their email and is submitting their
 *     username and password
 * (2) A user has just gone through the OAuth flow and is submitting
 *     a username
 */
router.post('/api/create-user', validateUsername, async (req, res) => {
  const { token, username, password } = req.body;

  // Verify that the Ticket exists
  const ticket = await Ticket.findOne({ token });
  if (!ticket) {
    return res.send({
      success: false,
      message: 'Account not found',
    });
  }

  // Verify that the ticket has been verified
  if (!ticket.isVerified) {
    return res.send({
      success: false,
      message: 'Email has not been verified',
    });
  }

  // Verify that the username has not already been taken
  if (await User.findOne({ username })) {
    return res.send({
      success: false,
      message: 'This username has already been taken',
    });
  }

  const { email, strategy, profileId } = ticket;
  let user;
  if (strategy === 'local') {
    // User signed up with Email/Local Strategy
    user = await User.register(
      new User({
        username,
        primaryEmail: email,
        [strategy]: {
          email,
        },
      }),
      password
    );
  } else {
    // User signed up with an OAuth Strategy
    user = await new User({
      username,
      primaryEmail: email,
      [strategy]: {
        id: profileId,
        email,
      },
    }).save();
  }

  // Delete all Tickets that share the same email as the Ticket
  await Ticket.deleteMany({ email });

  req.login(user, err => {
    res.send({ success: true });
  });
});

// router.post('/api/logout', (req, res) => {
//   req.logout();
//   res.send(req.user);
// });

/**
 * Used by pages that require tokens so that they can determine whether
 * the token has expired and if so will redirect to the home page
 */
router.post('/api/ticket-exists', async (req, res) => {
  try {
    res.send(!!(await Ticket.findOne({ token: req.body.token })));
  } catch (e) {
    res.send(false);
  }
});

/**
 * Used during validation to determine whether or not the name that
 * the user is submitting can be used.  This route could potentially
 * be omitted to favor relying solely on submission errors instead,
 * which may be preferable.
 */
router.post('/api/username-exists', async (req, res) => {
  const { username } = req.body;
  res.send({ found: !!(await User.findOne({ username })) });
});

/**
 * Create a password recovery Ticket for the email or username provided in the
 * body of the POST request. If the username or email is associated with any User
 * then associate the User with the Ticket and send a password recovery email.
 */
router.post('/api/recover-password', async (req, res) => {
  const { username, email } = req.body;

  if (!(username || email)) {
    return res.send({ success: false, message: 'Missing username or email.' });
  }

  const user =
    (await User.findOne({
      $or: [{ username }, { primaryEmail: email }],
    })) ||
    (email && (await findUserByEmail(email)));

  if (user) {
    sendPasswordRecoveryEmail(
      email || user.primaryEmail,
      req.headers.host,
      (
        await new Ticket({
          user: user && user._id, // user field is null if a User is not found
          action: RECOVER_PASSWORD,
        }).save()
      ).token
    );
  }
  res.send({ success: true });
});

/**
 * Find the Ticket associated with the token provided in the query string.
 * Remove all other Tickets that are associated with the same User or have
 * the same email as the one associated with that Ticket.
 */
router.get('/recover-password', verifyToken, async (req, res) => {
  const { token } = req.query;
  const ticket = await Ticket.findOne({ token });
  ticket.isVerified = true;
  const verifiedTicket = await ticket.save();

  // A token will be used to associate the username and pasword with the
  // provided email when the User is created
  const user = await User.findById(verifiedTicket.user);

  // Ensure that all other Tickets associated with this User are deleted
  await Ticket.deleteMany({
    $and: [{ user }, { _id: { $ne: verifiedTicket._id } }],
  });

  res.redirect(encodeURI(`/password-reset?token=${token}`));
});

/**
 * Request made from PasswordReset.
 *
 * The password for the User that is associated with the verified Ticket
 * identified by the token will be reset to the password provided in the
 * body of the request.
 */
router.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const ticket = await Ticket.findOne({ token });

  if (!(ticket && ticket.isVerified)) return res.send({ success: true });

  const user = await User.findById(ticket.user);
  if (!user) {
    return res.send({ success: false, message: 'Account does not exist.' });
  }
  user.setPassword(password, async (err, user) => {
    if (err) {
      return res.send({ success: false });
    }
    await user.save();
    res.send({ success: true });
  });

  // Ensure that all other Tickets associated with this User are deleted
  await Ticket.deleteMany({
    $and: [{ $or: [{ primaryEmail: user.email }, { user }] }],
  });
});

/**
 * Requests to this route are made from the Profile page.
 */
router.post(
  '/api/edit-username',
  isLoggedIn,
  validateUsername,
  async (req, res) => {
    const { user } = req;
    user.username = req.body.username;
    await user.save();
    res.send({ success: true });
  }
);

/**
 * Requests to this route are made from the Profile page.
 */
router.post('/api/edit-email', isLoggedIn, async (req, res) => {
  const { email } = req.body;
  const { user } = req;
  sendEmailResetEmail(
    email,
    req.headers.host,
    (
      await new Ticket({
        user: user._id,
        email,
        action: RESET_EMAIL,
      }).save()
    ).token
  );
  res.send({ success: true });
});

/**
 * User is sent to this route when clicking reset email from their inbox.
 */
router.get('/edit-email', async (req, res) => {
  const { token } = req.query;
  const ticket = await Ticket.findOne({
    $and: [{ token }, { action: RESET_EMAIL }],
  });
  console.log(ticket.user);
  const user = await User.findById(ticket.user);
  user.primaryEmail = ticket.email;
  user.local.email = ticket.email;
  await user.save();
  await Ticket.findByIdAndDelete(ticket._id);
  res.redirect('/');
});

router.post('/api/delete-user', async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  req.logout();
  res.send({ success: true });
});

module.exports = router;
