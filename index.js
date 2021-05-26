const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const { mongoURI, cookieKey } = require('./config/keys');
require('./models/User');
require('./models/Ticket');
require('./services/passport');
require('./services/sendgrid');

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(expressSanitizer());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./middlewares/sanitizeBody'));

const authenticationRoutes = require('./routes/authenticationRoutes');
const authorizationRoutes = require('./routes/authorizationRoutes');

app.use('/', authenticationRoutes);
app.use('/', authorizationRoutes);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;

  if (err.statusCode == 409) {
    const { signupMethods, email } = err;
    return res.redirect(
      encodeURI(
        // `/verify?signupMethods=${signupMethods.join(',')}&email=${email}`
        `/verify?signupMethods=${signupMethods.join(',')}`
      )
    );
  }
  console.log(err);
  res.redirect('/duplicate-email');
  // res.status(statusCode).redirect('/login', { message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
