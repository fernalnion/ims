const routes = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { UserController } = require('../controllers');

try {
  routes.post('/login', UserController.loginUser);
  module.exports = routes;
} catch (e) {
  logger.error(e);
}
