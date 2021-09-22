const { v4: uuid4 } = require("uuid");
const logger = require("../libraries/logger").getLogger();
const utilities = require("../libraries/utilities");
const { RoleBusiness } = require("../business");

try {
  module.exports = {
    createRole: async (req, res) => {
      try {
        const document = {
          roleid: uuid4(),
          rolename: req.body.rolename,
          description: req.body.description,
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
        const document = {
          rolename: req.body.rolename,
          description: req.body.description,
        };
        await RoleBusiness.update(req.params.roleid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteRole: async (req, res) => {
      try {
        const document = {
          rolename: req.body.rolename,
          description: req.body.description,
        };
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
        const result = await RoleBusiness.getRole(req.params.roleid);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getRoles: async (req, res) => {
      try {
        const result = await RoleBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
