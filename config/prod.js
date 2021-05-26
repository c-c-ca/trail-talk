const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URI,
  COOKIE_KEY,
  SEND_GRID_KEY,
  SEND_GRID_EMAIL,
  SIGHT_ENGINE_URI,
  SIGHT_ENGINE_API_USER,
  SIGHT_ENGINE_API_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = process.env;

module.exports = {
  googleClientID: GOOGLE_CLIENT_ID,
  googleClientSecret: GOOGLE_CLIENT_SECRET,
  mongoURI: MONGO_URI,
  cookieKey: COOKIE_KEY,
  sendGridKey: SEND_GRID_KEY,
  sendGridEmail: SEND_GRID_EMAIL,
  sightengineURI: SIGHT_ENGINE_URI,
  sightengineAPIUser: SIGHT_ENGINE_API_USER,
  sightengineAPISecret: SIGHT_ENGINE_API_SECRET,
  twitterConsumerKey: TWITTER_CONSUMER_KEY,
  twitterConsumerSecret: TWITTER_CONSUMER_SECRET,
  facebookAppID: FACEBOOK_APP_ID,
  facebookAppSecret: FACEBOOK_APP_SECRET,
  githubClientID: GITHUB_CLIENT_ID,
  githubClientSecret: GITHUB_CLIENT_SECRET,
};
