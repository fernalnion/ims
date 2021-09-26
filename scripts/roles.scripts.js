const { v4: uuid4 } = require('uuid');
const logger = require('../libraries/logger').getLogger();
const { RoleBusiness } = require('../business');

try {
  module.exports = {
    defaultRoleBuild: async () => {
      const adminRole = await RoleBusiness.getRole(null, 'admin');
      if (!adminRole) {
        await RoleBusiness.create({
          roleid: uuid4(),
          rolename: 'admin',
          description: 'Administrator Access Level',
        });
      }
    },
  };
} catch (e) {
  logger.error(e);
}
