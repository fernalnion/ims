const { v4: uuid4 } = require('uuid');
const logger = require('../libraries/logger').getLogger();
const { UserBusiness, RoleBusiness } = require('../business');

try {
  module.exports = {
    defaultUserBuild: async () => {
      const adminUser = await UserBusiness.getUser(null, 'admin');
      if (!adminUser) {
        const { roleid } = await RoleBusiness.getRole(null, 'admin');
        await UserBusiness.create({
          userid: uuid4(),
          username: 'admin',
          password: 'admin',
          email: 'admin@example.com',
          firstname: 'admin',
          lastname: 'admin',
          phone: '9876543210',
          roleid,
          isLocked: false,
          isActivated: true,
        });
      }
    },
  };
} catch (e) {
  logger.error(e);
}
