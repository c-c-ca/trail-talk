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
};
