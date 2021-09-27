const logger = require("../libraries/logger").getLogger();
const { CustomerModel } = require("../models");

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await CustomerModel.create(document);
      return data._doc;
    },
    update: async (customerid, document) => {
      const data = await CustomerModel.findOneAndUpdate(
        { customerid },
        document,
        {
          upsert: true,
          new: false,
        }
      ).lean();
      return data;
    },
    delete: (customerid) => CustomerModel.deleteOne({ customerid }),
    getCustomer: async (customerid, phone, email) => {
      const data = await CustomerModel.findOne({
        $or: [{ customerid }, { phone }, { email }],
      })
        .populate("User")
        .lean();
      return data;
    },
    getAll: async () => {
      const data = await CustomerModel.find({}).populate("User").lean();
      return data;
    },
  };
} catch (e) {
  logger.error(e);
}
