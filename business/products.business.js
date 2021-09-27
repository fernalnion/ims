const logger = require('../libraries/logger').getLogger();
const { ProductModel } = require('../models');

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await ProductModel.create(document);
      return data._doc;
    },
    update: async (productid, document) => {
      const data = await ProductModel.findOneAndUpdate(
        { productid },
        document,
        {
          upsert: true,
          new: false,
        },
      ).lean();
      return data;
    },
    delete: (productid) => ProductModel.deleteOne({ productid }),
    getProduct: async (productid, name) => {
      const data = await ProductModel.findOne({
        $or: [{ productid }, { name }],
      }).lean();
      return data;
    },
    getAll: async () => {
      const data = await ProductModel.find({}).lean();
      return data;
    },
  };
} catch (e) {
  logger.error(e);
}
