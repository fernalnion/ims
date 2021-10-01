const logger = require("../libraries/logger").getLogger();
const { CustomerModel } = require("../models");

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await CustomerModel.create(document);
      return data._doc;
    },
    update: async (supplierid, document) => {
      const data = await CustomerModel.findOneAndUpdate(
        { supplierid },
        document,
        {
          upsert: true,
          new: false,
        }
      ).lean();
      return data;
    },
    delete: (supplierid) => CustomerModel.deleteOne({ supplierid }),
    getSupplier: async (supplierid, name, phone, email) => {
      const data = await CustomerModel.findOne({
        $or: [{ supplierid }, { name }, { phone }, { email }],
      }).lean();
      return data;
    },
    isSupplierExist: async (supplierid, name, phone, email) => {
      const data = await CustomerModel.find({
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
      const data = await CustomerModel.find({}).lean();
      return data;
    },
  };
} catch (e) {
  logger.error(e);
}
