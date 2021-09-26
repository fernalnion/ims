const routes = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { TokenController } = require('../controllers');

try {
  routes.get('/', TokenController.getTokens);
  routes.get('/token', TokenController.getTokenByUserid);
  routes.get('/token/:token', TokenController.getToken);
  routes.post('/revoke', TokenController.revokeToken);
  routes.post('/revoke/all', TokenController.revokeTokenByUser);
  module.exports = routes;
} catch (e) {
  logger.error(e);
}
