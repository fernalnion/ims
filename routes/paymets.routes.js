const router = require('express').Router();
const logger = require('../libraries/logger').getLogger();
const { PaymentController } = require('../controllers');
const { isMaganer } = require('../middleware').rolesMiddleware;

try {
  // users
  router.get('/', PaymentController.getPayments);
  router.get('/:paymentid', PaymentController.getPayment);
  router.post('/create', [isMaganer], PaymentController.createPayment);
  router.put('/:paymentid', [isMaganer], PaymentController.updatePayment);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
