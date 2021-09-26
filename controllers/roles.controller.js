const { v4: uuid4 } = require('uuid');
const lodash = require('lodash');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { RoleBusiness } = require('../business');

try {
  module.exports = {
    createRole: async (req, res) => {
      try {
        const document = {
          roleid: uuid4(),
          ...req.body,
        };
        const isexist = await RoleBusiness.getRole(null, document.rolename);
        if (isexist) {
          return res
            .status(500)
            .send(utilities.error(`Role already exists(${document.rolename})`));
        }
        const result = await RoleBusiness.create(document);
        return res.status(200).send(utilities.response(result._doc));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateRole: async (req, res) => {
      try {
        const document = { ...lodash.omit(req.body, ['_id', 'userid', 'roleid']) };
        await RoleBusiness.update(req.params.roleid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteRole: async (req, res) => {
      try {
        await RoleBusiness.delete(req.params.roleid);
        return res
          .status(200)
          .send(utilities.response({ roleid: req.params.roleid }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getRole: async (req, res) => {
      try {
        const result = lodash.omit(await RoleBusiness.getRole(req.params.roleid), ['_id']);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getRoles: async (_, res) => {
      try {
        const result = (await RoleBusiness.getAll()).map((m) => lodash.omit(m, ['_id']));
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
