const sgMail = require('@sendgrid/mail');
const { sendGridKey, sendGridEmail } = require('../config/keys');
sgMail.setApiKey(sendGridKey);

const renderText = (url, text) => `${text}: ${url}`;
const renderHtml = (url, text) => `<a href="${url}">${text}</a>`;

const embed = (domain, path, token) => render => text =>
  render(`http://${domain}/${path}?token=${token}`, text);

const createMessage =
  (subject, text, html, path) => (userEmail, domain, token) => {
    const embedLink = embed(domain, path, token);
    const createTextMessage = embedLink(renderText);
    const createHtmlMessage = embedLink(renderHtml);

    return {
      to: userEmail,
      from: sendGridEmail,
      subject: `Trail Talk | ${subject}`,
      text: createTextMessage(text),
      html: createHtmlMessage(html),
    };
  };

const createEmailVerificationMessage = createMessage(
  'Verify Your Email',
  'Copy and paste the following link into your address bar:',
  'Click to verify',
  'verify-email'
);

const createPasswordRecoveryMessage = createMessage(
  'Password Recovery',
  'Copy and paste the following link into your address bar:',
  'Click to recover your password',
  'recover-password'
);

module.exports.sendVerificationEmail = async (email, domain, token) => {
  try {
    await sgMail.send(createEmailVerificationMessage(email, domain, token));
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendPasswordRecoveryEmail = async (email, domain, token) => {
  try {
    await sgMail.send(createPasswordRecoveryMessage(email, domain, token));
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendEmailCollisionEmail = async (email, domain, username) => {
  try {
    const url = `http://${domain}/password-reset`;
    const textMessage = `An account with username ${username} already exists.  
    Please visit ${url} if you forgot your passwrod.`;
    const htmlMessage = `An account with username <code>${username}</code> already exists.  
    Please visit <a href="${url}">this link</a> if you forgot your password.`;
    await sgMail.send({
      to: email,
      from: sendGridEmail,
      subject: `Trail Talk | An Account With This Email Already Exists`,
      text: textMessage,
      html: htmlMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendEmailResetEmail = async (email, domain, token) => {
  try {
    const url = `http://${domain}/edit-email?token=${token}`;
    const textMessage = `Please visit ${url} to reset your email.`;
    const htmlMessage = `To reset your email please visit the following link: <a href="${url}">this link</a>.`;
    await sgMail.send({
      to: email,
      from: sendGridEmail,
      subject: `Trail Talk | Reset Email`,
      text: textMessage,
      html: htmlMessage,
    });
  } catch (error) {
    console.log(error);
  }
};
