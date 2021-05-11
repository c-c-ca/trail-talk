const sgMail = require('@sendgrid/mail');
const { sendGridKey, sendGridEmail } = require('../config/dev');
sgMail.setApiKey(sendGridKey);

const embedToken = (domain, token) =>
  `http://${domain}/auth/verify-email?token=${token}`;

const renderText = (domain, token) =>
  `Copy and paste the following link into your address bar: ${embedToken(
    domain,
    token
  )}`;

const renderHtml = (domain, token) =>
  `<a href="${embedToken(domain, token)}">Click to verify</a>`;

const createMessage = (userEmail, domain, token) => ({
  to: userEmail,
  from: sendGridEmail,
  subject: 'TrailTalk | Verify Your Email',
  text: renderText(domain, token),
  html: renderHtml(domain, token),
});

module.exports.sendVerificationEmail = async (userEmail, domain, token) => {
  try {
    await sgMail.send(createMessage(userEmail, domain, token));
  } catch (error) {
    console.log(error);
  }
};
