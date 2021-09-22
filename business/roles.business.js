const logger = require("../libraries/logger").getLogger();
const { RoleModel } = require("../models");

try {
  module.exports = {
    create: (document) => RoleModel.create(document),
    update: (roleid, document) =>
      RoleModel.findOneAndUpdate({ roleid }, document, {
        upsert: true,
        new: false,
      }).lean(),
    delete: (roleid) => RoleModel.deleteOne({ roleid }),
    getRole: (roleid, rolename) =>
      RoleModel.findOne({ $or: [{ roleid }, { rolename }] }).lean(),
    getAll: () => RoleModel.find({}).lean(),
  };
} catch (e) {
  logger.error(e);
}
