const logger = require('../libraries/logger').getLogger();
const { CategoryModel } = require('../models');

try {
  // module exports
  module.exports = {
    create: async (document) => {
      const data = await CategoryModel.create(document);
      return data._doc;
    },
    update: async (categoryid, document) => {
      const data = await CategoryModel.findOneAndUpdate(
        { categoryid },
        document,
        {
          upsert: true,
          new: false,
        },
      ).lean();
      return data;
    },
    delete: (categoryid) => CategoryModel.deleteOne({ categoryid }),
    getCategory: async (categoryid, name) => {
      const data = await CategoryModel.findOne({
        $or: [{ categoryid }, { name }],
      }).lean();
      return data;
    },
    getAll: async () => {
      const data = await CategoryModel.find({}).lean();
      return data;
    },
  };
} catch (e) {
  logger.error(e);
}
