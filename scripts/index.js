const RoleScripts = require('./roles.scripts');
const UserScripts = require('./users.scripts');

module.exports = {
  init: async () => {
    await RoleScripts.defaultRoleBuild().catch();
    await UserScripts.defaultUserBuild().catch();
  },
};
