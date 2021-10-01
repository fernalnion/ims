const router = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { UserController } = require('../controllers');
const { isMaganer } = require('../middleware').rolesMiddleware;

try {
  // users
  router.get('/', [isMaganer], UserController.getUsers);
  router.get('/user', UserController.getUser);
  router.post('/', [isMaganer], UserController.createUser);
  router.put('/:userid', [isMaganer], UserController.updateUser);
  router.delete('/:userid', [isMaganer], UserController.deleteUser);

  // token
  router.post('/refresh-token', UserController.refreshToken);
  router.post('/revoke-token', UserController.revokeToken);
  router.get('/:userid/refresh-token', UserController.getRefreshTokens);

  module.exports = router;
} catch (e) {
  logger.error(e);
}
