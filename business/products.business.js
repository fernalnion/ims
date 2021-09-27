const logger = require("../libraries/logger").getLogger();
const { ProductModel } = require("../models");

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
        }
      ).lean();
      return data;
    },
    delete: (productid) => ProductModel.deleteOne({ productid }),
    getProduct: async (productid, name) => {
      const data = await ProductModel.findOne({
        $or: [{ productid }, { name }],
      })
        .populate([{ path: "supplier" }, { path: "category" }])
        .lean();
      return data;
    },
    getAll: async () => {
      const data = await ProductModel.find({})
        .populate([{ path: "supplier" }, { path: "category" }])
        .lean();
      return data;
    },
    updateQuantity: async (productid, quanity) => {
      const data = await ProductModel.findOne({ productid });
      const { supplier, category } = data;
      data.quanity += parseInt(quanity, 10);
      await data.save();
      return {
        ...data._doc,
        supplier: supplier.supplierid,
        category: category.categoryid,
      };
    },
  };
} catch (e) {
  logger.error(e);
}
