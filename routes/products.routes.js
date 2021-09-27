const router = require("express").Router();
const logger = require("../libraries/logger").getLogger();
const { ProductController } = require("../controllers");
const { isMaganer } = require("../middleware").rolesMiddleware;

try {
  // users
  router.get("/", ProductController.getProducts);
  router.get("/:productid", ProductController.getProduct);
  router.post("/create", [isMaganer], ProductController.createProduct);
  router.put("/:productid", ProductController.updateProduct);
  router.delete("/:productid", [isMaganer], ProductController.deleteProduct);
  router.put("/:productid/:quantity", ProductController.updateQuantity);
  module.exports = router;
} catch (e) {
  logger.error(e);
}
