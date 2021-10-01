const router = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { CategoryController } = require('../controllers');
const { isMaganer } = require('../middleware').rolesMiddleware;

try {
  // users
  router.get('/', CategoryController.getCategories);
  router.get('/:categoryid', CategoryController.getCategory);
  router.post('/', [isMaganer], CategoryController.createCategory);
  router.put('/:categoryid', [isMaganer], CategoryController.updateCategory);
  router.delete('/:categoryid', [isMaganer], CategoryController.deleteCategory);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
