const { v4: uuid4 } = require("uuid");
const lodash = require("lodash");
const logger = require("../libraries/logger").getLogger();
const utilities = require("../libraries/utilities");
const { OrderBusiness } = require("../business");

try {
  module.exports = {
    createCategory: async (req, res) => {
      try {
        const document = {
          orderid: uuid4(),
          ...req.body,
        };
        const result = await OrderBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getOrder: async (req, res) => {
      try {
        const result = await OrderBusiness.getOrder(req.params.orderid);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
