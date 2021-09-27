const { v4: uuid4 } = require('uuid');
const lodash = require('lodash');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { SupplierBusiness } = require('../business');

try {
  module.exports = {
    createSupplier: async (req, res) => {
      try {
        const document = {
          supplierid: uuid4(),
          ...req.body,
        };
        const isexist = await SupplierBusiness.getSupplier(
          null,
          document.name,
          document.phone,
          document.email,
        );
        if (isexist) {
          return res
            .status(500)
            .send(
              utilities.error(
                `Supplier already exists(${document.name} / ${document.phone} / ${document.email})`,
              ),
            );
        }
        const result = await SupplierBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateSupplier: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ['_id', 'supplierid']),
        };
        await SupplierBusiness.update(req.params.supplierid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteSupplier: async (req, res) => {
      try {
        await SupplierBusiness.delete(req.params.supplierid);
        return res
          .status(200)
          .send(utilities.response({ supplierid: req.params.supplierid }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getSupplier: async (req, res) => {
      try {
        const result = await SupplierBusiness.getSupplier(
          req.params.supplierid,
        );
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getSuppliers: async (_, res) => {
      try {
        const result = await SupplierBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
