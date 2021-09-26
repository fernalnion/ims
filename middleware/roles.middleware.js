const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { RoleBusiness } = require('../business');

try {
  module.exports = {
    isAdmin: async (req, res, next) => {
      const managerRole = await RoleBusiness.getRolesByRolenames(['admin']);
      if (!managerRole.find((role) => role.roleid === req.user.roleid)) {
        return res.status(403).send(utilities.error('Forbidden!'));
      }
      next();
    },
    isMaganer: async (req, res, next) => {
      const managerRole = await RoleBusiness.getRolesByRolenames([
        'admin',
        'manager',
      ]);
      if (!managerRole.find((role) => role.roleid === req.user.roleid)) {
        return res.status(403).send(utilities.error('Forbidden!'));
      }
      next();
    },
  };
} catch (e) {
  logger.error(e);
}
