const lodash = require("lodash");
const logger = require("../libraries/logger").getLogger();
const { ItemModel } = require("../models");

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await ItemModel.create(document);
      return data._doc;
    },
    update: async (itemid, document) => {
      const data = await ItemModel.findOneAndUpdate({ itemid }, document, {
        upsert: true,
        new: false,
      }).lean();
      return data;
    },
    delete: (itemid) => ItemModel.deleteOne({ itemid }),
    getItem: async (itemid) => {
      const data = await ItemModel.findOne({ itemid })
        .populate([{ path: "product" }, { path: "order" }])
        .lean();
      return data;
    },
    getAll: async () => {
      const data = await ItemModel.find({})
        .populate([{ path: "product" }, { path: "order" }])
        .lean();
      return data;
    },
    updateQuantity: async (itemid, quanity) => {
      const data = await ItemModel.findOne({ itemid });
      const { product, order } = data;
      data.quanity += parseInt(quanity, 10);
      await data.save();
      return lodash.omit({
        ...data._doc,
        product: product.productid,
        order: order.orderid,
      });
    },
  };
} catch (e) {
  logger.error(e);
}
