const lodash = require("lodash");
const logger = require("../libraries/logger").getLogger();
const { OrderModel } = require("../models");
const ItemBusiness = require("./items.business");

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await OrderModel.create(document);
      return data._doc;
    },
    getOrder: async (orderid) => {
      const data = await OrderModel.findOne({ orderid })
        .populate([{ path: "customer" }, { path: "payment" }])
        .lean();
      return data;
    },
  };
} catch (e) {
  logger.error(e);
}
