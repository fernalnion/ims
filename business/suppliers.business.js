const logger = require("../libraries/logger").getLogger();
const { SupplierModel } = require("../models");

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await SupplierModel.create(document);
      return data._doc;
    },
    update: async (supplierid, document) => {
      const data = await SupplierModel.findOneAndUpdate(
        { supplierid },
        document,
        {
          upsert: true,
          new: false,
        }
      ).lean();
      return data;
    },
    delete: (supplierid) => SupplierModel.deleteOne({ supplierid }),
    getSupplier: async (supplierid, name, phone, email) => {
      const data = await SupplierModel.findOne({
        $or: [{ supplierid }, { name }, { phone }, { email }],
      }).lean();
      return data;
    },
    isSupplierExist: async (supplierid, name, phone, email) => {
      const data = await SupplierModel.find({
        $and: [
          {
            supplierid: { $ne: supplierid },
          },
          {
            $or: [{ name }, { phone }, { email }],
          },
        ],
      }).lean();
      return data;
    },
    getAll: async () => {
      const data = await SupplierModel.find({}).lean();
      return data;
    },
  };
} catch (e) {
  logger.error(e);
}
