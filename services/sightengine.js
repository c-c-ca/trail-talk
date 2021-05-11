const axios = require('axios');
const {
  sightengineURI,
  sightengineAPIUser: api_user,
  sightengineAPISecret: api_secret,
} = require('../config/keys');

const mode = 'standard';
const lang = 'en';

module.exports.containsProfanity = async text => {
  const {
    data: {
      profanity: { matches: matches },
    },
  } = await axios.post(sightengineURI, null, {
    params: { api_user, api_secret, mode, lang, text },
  });
  return matches.length > 0;
};
