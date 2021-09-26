const routes = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { UserController } = require('../controllers');
const { isMaganer } = require('../middleware').rolesMiddleware;

try {
  routes.get('/', [isMaganer], UserController.getUsers);
  routes.get('/:userid', UserController.getUser);
  routes.post('/create', [isMaganer], UserController.createUser);
  routes.put('/:userid', [isMaganer], UserController.updateUser);
  routes.delete('/:userid', [isMaganer], UserController.deleteUser);
  module.exports = routes;
} catch (e) {
  logger.error(e);
}
