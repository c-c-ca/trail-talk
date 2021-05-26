const { Router } = require('express');
const router = Router();

require('./facebookRoutes')(router);
require('./githubRoutes')(router);
require('./googleRoutes')(router);
require('./twitterRoutes')(router);
require('./localRoutes')(router);

module.exports = router;
