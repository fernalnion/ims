const router = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { RoleController } = require('../controllers');
const { isMaganer } = require('../middleware').rolesMiddleware;

try {
  router.get('/', [isMaganer], RoleController.getRoles);
  router.get('/:roleid', RoleController.getRole);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
