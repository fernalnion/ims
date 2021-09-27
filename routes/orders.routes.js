const router = require("express").Router();
const logger = require("../libraries/logger").getLogger();
const { OrderController } = require("../controllers");

try {
  // users
  router.get("/:categoryid", OrderController.getOrder);
  router.post("/create", OrderController.createCategory);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
