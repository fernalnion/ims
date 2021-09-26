const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { RoleBusiness } = require('../business');

try {
  module.exports = {
    getRole: (req, res) => {
      try {
        const result = RoleBusiness.getRole(req.params.roleid);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getRoles: (_, res) => {
      try {
        const result = RoleBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
