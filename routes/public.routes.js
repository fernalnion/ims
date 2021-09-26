const router = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { UserController } = require('../controllers');

try {
  router.post('/login', UserController.loginUser);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
