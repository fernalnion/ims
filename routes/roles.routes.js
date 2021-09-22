const routes = require("express").Router();
const logger = require("../libraries/logger").getLogger();
const { RoleController } = require("../controllers");
try {
  routes.get("/", RoleController.getRoles);
  routes.get("/:roleid", RoleController.getRole);
  routes.post("/create", RoleController.createRole);
  routes.put("/:roleid", RoleController.updateRole);
  routes.delete("/:roleid", RoleController.deleteRole);
  module.exports = routes;
} catch (e) {
  logger.error(e);
}
