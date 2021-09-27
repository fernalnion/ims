const logger = require('../libraries/logger').getLogger();
const { PaymentModel } = require('../models');

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await PaymentModel.create(document);
      return data._doc;
    },
    update: async (paymentid, document) => {
      const data = await PaymentModel.findOneAndUpdate(
        { paymentid },
        document,
        {
          upsert: true,
          new: false,
        },
      ).lean();
      return data;
    },
    getPayment: async (paymentid) => {
      const data = await PaymentModel.findOne({ paymentid }).lean();
      return data;
    },
    getAll: async () => {
      const data = await PaymentModel.find({}).lean();
      return data;
    },
  };
} catch (e) {
  logger.error(e);
}
