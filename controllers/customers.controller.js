const { v4: uuid4 } = require('uuid');
const lodash = require('lodash');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { CustomerBusiness } = require('../business');

try {
  module.exports = {
    createCustomer: async (req, res) => {
      try {
        const document = {
          customerid: uuid4(),
          ...req.body,
        };
        const isexist = await CustomerBusiness.getCustomer(
          null,
          document.phone,
          document.email,
        );
        if (isexist) {
          return res
            .status(500)
            .send(
              utilities.error(
                `Customer already exists(${document.phone} / ${document.email})`,
              ),
            );
        }
        const result = await CustomerBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateCustomer: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ['_id', 'customerid']),
        };
        await CustomerBusiness.update(req.params.customerid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteCustomer: async (req, res) => {
      try {
        await CustomerBusiness.delete(req.params.customerid);
        return res
          .status(200)
          .send(utilities.response({ customerid: req.params.customerid }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getCustomer: async (req, res) => {
      try {
        const result = await CustomerBusiness.getCustomer(
          req.params.customerid,
        );
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getCustomers: async (_, res) => {
      try {
        const result = await CustomerBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
