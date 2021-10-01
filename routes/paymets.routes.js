const router = require("express").Router();
const logger = require("../libraries/logger").getLogger();
const { PaymentController } = require("../controllers");

try {
  // users
  router.get("/", PaymentController.getPayments);
  router.get("/:paymentid", PaymentController.getPayment);
  router.post("/", PaymentController.createPayment);
  router.put("/:paymentid", PaymentController.updatePayment);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
