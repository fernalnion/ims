const router = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { CustomerController } = require('../controllers');
const { isMaganer } = require('../middleware').rolesMiddleware;

try {
  // users
  router.get('/', CustomerController.getCustomers);
  router.get('/:customerid', CustomerController.getCustomer);
  router.post('/', [isMaganer], CustomerController.createCustomer);
  router.put('/:customerid', [isMaganer], CustomerController.updateCustomer);
  router.delete('/:customerid', [isMaganer], CustomerController.deleteCustomer);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
