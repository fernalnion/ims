const { v4: uuid4 } = require('uuid');
const lodash = require('lodash');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { PaymentBusiness } = require('../business');

try {
  module.exports = {
    createPayment: async (req, res) => {
      try {
        const document = {
          paymentid: uuid4(),
          ...req.body,
        };
        const result = await PaymentBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updatePayment: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ['_id', 'paymentid']),
        };
        await PaymentBusiness.update(req.params.paymentid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getPayment: async (req, res) => {
      try {
        const result = await PaymentBusiness.getPayment(req.params.paymentid);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getPayments: async (_, res) => {
      try {
        const result = await PaymentBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
