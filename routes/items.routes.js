const router = require("express").Router();
const logger = require("../libraries/logger").getLogger();
const { ItemController } = require("../controllers");
const { isMaganer } = require("../middleware").rolesMiddleware;

try {
  // users
  router.get("/", ItemController.getItems);
  router.get("/:itemid", ItemController.getItem);
  router.post("/", [isMaganer], ItemController.createItem);
  router.put("/:itemid", ItemController.updateItem);
  router.delete("/:itemid", [isMaganer], ItemController.deleteItem);
  router.put("/:itemid/:quantity", ItemController.updateQuantity);
  module.exports = router;
} catch (e) {
  logger.error(e);
}

