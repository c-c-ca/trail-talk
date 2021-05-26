const signupMethods = ['facebook', 'github', 'google', 'twitter', 'local'];
const prefixes = ['auth', 'verify', 'connect'];

const authRoutes = signupMethods.reduce(
  (routes, signupMethod) => [
    ...routes,
    ...prefixes.map(prefix => `/${prefix}/${signupMethod}`),
  ],
  []
);

const createProxyMiddleware = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    [
      ...authRoutes,
      '/api',
      // '/register',
      // '/login',
      '/auth/verify-email',
      '/auth/create-username',
      '/auth/login-failure',
      '/verify-email',
      '/recover-password',
      '/edit-email',
    ],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
