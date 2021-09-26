const routes = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { UserController } = require('../controllers');

try {
  routes.get('/', UserController.getUsers);
  routes.get('/:userid', UserController.getUser);
  routes.post('/create', UserController.createUser);
  routes.put('/:userid', UserController.updateUser);
  routes.delete('/:userid', UserController.deleteUser);
  module.exports = routes;
} catch (e) {
  logger.error(e);
}
