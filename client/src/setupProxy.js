const createProxyMiddleware = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    [
      '/api',
      '/auth/google',
      '/auth/twitter',
      '/auth/register',
      '/auth/login',
      '/auth/verify-email',
      '/auth/create-username',
      '/auth/login-failure',
    ],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
