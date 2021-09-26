const logger = require('../libraries/logger').getLogger();
const { RolesEnum } = require('../enums');

try {
  module.exports = {
    getRole: (roleid, rolename) => Object.values(RolesEnum).find((role) => role.roleid === roleid || role.rolename === rolename),
    getRolesByRolenames: (rolenames) => Object.values(RolesEnum).filter((role) => rolenames.includes(role.rolename)),
    getAll: () => Object.values(RolesEnum),
  };
} catch (e) {
  logger.error(e);
}
