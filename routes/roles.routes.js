const routes = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { RoleController } = require('../controllers');
const { isAdmin, isMaganer } = require('../middleware').rolesMiddleware;

try {
  routes.get('/', [isMaganer], RoleController.getRoles);
  routes.get('/:roleid', RoleController.getRole);
  routes.post('/create', [isAdmin], RoleController.createRole);
  routes.put('/:roleid', [isAdmin], RoleController.updateRole);
  routes.delete('/:roleid', [isAdmin], RoleController.deleteRole);
  module.exports = routes;
} catch (e) {
  logger.error(e);
}
