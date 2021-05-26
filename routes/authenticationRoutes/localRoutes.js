const passport = require('passport');
const mongoose = require('mongoose');
const { sendVerificationEmail } = require('../../services/sendgrid');
const validateUsername = require('../../middlewares/validateUsername');
const generateToken = require('../../utils/generateToken');
const findUserByEmail = require('../../utils/findUserByEmail');
const findSignupMethodsForUser = require('../../utils/findSignupMethodsForUser');

const User = mongoose.model('users');
const Ticket = mongoose.model('tickets');

const STRATEGIES = ['facebook', 'github', 'google', 'twitter'];

const hasNonLocalAccount = user => STRATEGIES.some(strategy => user[strategy]);

module.exports = router => {
  // router.post('/register', validateUsername, async (req, res, next) => {
  //   try {
  //     const { email, username, password } = req.body;

  //     const userByUsername = await User.findOne({ username });
  //     if (userByUsername) {
  //       if (userByUsername.isActive) {
  //         return res.send({
  //           success: false,
  //           message: 'That username has already been taken',
  //         });
  //       }
  //       await User.findByIdAndDelete(userByUsername.id);
  //     }

  //     // attempt to link accounts
  //     // just tell the user that they need to check their emails
  //     // linking accounts will be taken care of during verification/connection/authorization
  //     const userByEmail = await findUserByEmail(email);
  //     if (userByEmail) {
  //       if (userByEmail.isActive) {
  //         if (userByEmail.local.email == email) {
  //           return res.send({
  //             success: false,
  //             message: 'An account for this email address already exists',
  //           });
  //         } else {
  //           userByEmail.local = {
  //             email,
  //             emailToken: generateToken(),
  //           };
  //           return sendVerificationEmail(
  //             email,
  //             req.headers.host,
  //             userByEmail.emailToken
  //           );
  //         }
  //       } else {
  //         await User.findByIdAndDelete(userByEmail.id);
  //       }
  //     }

  //     sendVerificationEmail(
  //       email,
  //       req.headers.host,
  //       (
  //         await User.register(
  //           new User({
  //             email,
  //             username,
  //             emailToken: generateToken(),
  //           }),
  //           password
  //         )
  //       ).emailToken
  //     );

  //     res.send({ success: true });
  //   } catch (e) {
  //     res.redirect('/register');
  //   }
  // });

  // const createLocalAccount = (email, password) => ({
  //   email,
  //   password,
  //   token: generateToken(),
  // });

  // const createAndSaveNewUser = async (username, email, password) =>
  //   await new User({
  //     username,
  //     local: createLocalAccount(email, password),
  //   }).save();

  // router.post(
  //   '/api/create-user',
  //   validateUsername,
  //   // validateToken,
  //   async (req, res, next) => {
  //     const { username, password, token } = req.body;
  //     const ticket = await Ticket.findOne({ token });

  //     if (!ticket) {
  //       return res.send({
  //         success: false,
  //         message: 'Token not found',
  //       });
  //     }

  //     await new User({
  //       username,
  //       email: ticket.email,
  //       password,
  //     }).save();

  //     await Ticket.findByIdAndDelete(ticket.id);

  //     res.send({ success: true });
  //   }
  // );

  // router.post('/register', validateUsername, async (req, res, next) => {
  //   try {
  //     const { email, username, password } = req.body;

  //     let emailToken = null;
  //     const userByEmail = await findUserByEmail(email);
  //     if (userByEmail && !userByEmail.local) {
  //       if (hasNonLocalAccount(userByEmail)) {
  //         userByEmail.local = createLocalAccount(email, password);
  //         await userByEmail.save();
  //         emailToken = userByEmail.local.token;
  //       } else {
  //         User.findByIdAndDelete(userByEmail.id);
  //         const newUser = await createAndSaveNewUser(username, email, password);
  //         emailToken = newUser.local.token;
  //       }
  //     } else {
  //       if (await User.findOne({ username })) {
  //         return res.send({
  //           success: false,
  //           message: 'That username has already been taken',
  //         });
  //       }
  //       const newUser = await createAndSaveNewUser(username, email, password);
  //       emailToken = newUser.local.token;
  //     }

  //     sendVerificationEmail(email, req.headers.host, emailToken);
  //   } catch (e) {
  //     res.redirect('/register');
  //   }
  // });

  // router.get('/auth/verify-email', async (req, res, next) => {
  //   try {
  //     const user = await User.findOne({ emailToken: req.query.token });
  //     if (user) {
  //       user.isActive = true;
  //       await user.save();
  //       req.login(user, err => {
  //         if (err) {
  //           return next(err);
  //         }
  //         res.redirect('/');
  //       });
  //     } else {
  //       res.redirect('/verification-failure');
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
  // });

  /**
   * Requests to this route are made from the Login page in order to login
   * a User using a username and password.
   */
  router.post(
    '/api/login',
    passport.authenticate('local', {
      failureRedirect: '/api/login-failure',
    }),
    (req, res) => {
      res.send({ success: true });
    }
  );

  /**
   * This route exists simply as a fallback when the user does not enter a valid
   * username or password.
   */
  router.get('/api/login-failure', (req, res) => {
    res.send({
      success: false,
      message: 'You have entered an invalid username or password',
    });
  });
};
