const passport = require('passport');
const mongoose = require('mongoose');
const { sendVerificationEmail } = require('../services/sendgrid');
const validateUsername = require('../middlewares/validateUsername');
const generateToken = require('../utils/generateToken');

const User = mongoose.model('users');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const { usernameToken } = req.user;
      if (usernameToken) {
        req.logout();
        return res.redirect(`/create-username?token=${usernameToken}`);
      }
      res.redirect('/');
    }
  );

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  app.get('/api/current-user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.post('/auth/register', validateUsername, async (req, res, next) => {
    try {
      const { email, username, password } = req.body;

      let user = await User.findOne({ username });
      if (user) {
        if (user.isActive) {
          return res.send({
            success: false,
            message: 'That username has already been taken',
          });
        } else {
          await User.findByIdAndDelete(user.id);
        }
      }

      user = await User.findOne({ email });
      if (user) {
        if (user.isActive) {
          return res.send({
            success: false,
            message: 'This email address is already being used',
          });
        } else {
          await User.findByIdAndDelete(user.id);
        }
      }

      sendVerificationEmail(
        email,
        req.headers.host,
        (
          await User.register(
            new User({
              email,
              username,
              emailToken: generateToken(),
            }),
            password
          )
        ).emailToken
      );

      res.send({ success: true });
    } catch (e) {
      console.log(e);
      res.redirect('/register');
    }
  });

  app.post(
    '/auth/create-username',
    validateUsername,
    async (req, res, next) => {
      const user = await User.findOne({ usernameToken: req.body.token });
      if (!user) {
        return res.send({
          success: false,
          message: 'Account not found',
        });
      }

      const { username } = req.body;

      if (await User.findOne({ username })) {
        return res.send({
          success: false,
          message: 'This username has already been taken',
        });
      }

      user.username = username;
      user.isActive = true;
      user.usernameToken = null;

      const activatedUser = await user.save();
      req.login(activatedUser, err => {
        res.send({ success: true });
      });
    }
  );

  app.post('/api/fresh-username-token', async (req, res) =>
    res.send(!!(await User.findOne({ usernameToken: req.body.token })))
  );

  app.get('/auth/verify-email', async (req, res, next) => {
    try {
      const user = await User.findOne({ emailToken: req.query.token });
      if (user) {
        user.isActive = true;
        await user.save();
        req.login(user, err => {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      } else {
        res.redirect('/verification-failure');
      }
    } catch (e) {
      next(e);
    }
  });

  app.post(
    '/auth/login',
    passport.authenticate('local', {
      failureRedirect: '/auth/login-failure',
    }),
    (req, res) => {
      if (!req.user.isActive) {
        req.logout();
        res.send({
          success: false,
          message: 'Please check your inbox to activate your account',
        });
      }
      res.send({ success: true });
    }
  );

  app.get('/auth/login-failure', (req, res) => {
    res.send({
      success: false,
      message: 'You have entered an invalid username or password',
    });
  });
};
