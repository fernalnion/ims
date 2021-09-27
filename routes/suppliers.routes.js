const router = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { SupplierController } = require('../controllers');
const { isMaganer } = require('../middleware').rolesMiddleware;

try {
  // users
  router.get('/', SupplierController.getSuppliers);
  router.get('/:supplierid', SupplierController.getSupplier);
  router.post('/create', [isMaganer], SupplierController.createSupplier);
  router.put('/:supplierid', [isMaganer], SupplierController.updateSupplier);
  router.delete('/:supplierid', [isMaganer], SupplierController.deleteSupplier);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
