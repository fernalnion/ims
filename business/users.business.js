const bcrypt = require('bcryptjs');
const logger = require('../libraries/logger').getLogger();
const { UserModel } = require('../models');

try {
  module.exports = {
    create: (document) => {
      const passwordhash = bcrypt.hashSync(document.password, 8);
      return UserModel.create({ ...document, passwordhash });
    },
    update: (userid, document) => UserModel.findOneAndUpdate({ userid }, document, {
      upsert: true,
      new: false,
    }).lean(),
    delete: (userid) => UserModel.deleteOne({ userid }),
    getUser: (userid, username, email) => UserModel.findOne({ $or: [{ userid }, { username }, { email }] }).lean(),
    getAll: () => UserModel.find({}).lean(),
  };
} catch (e) {
  logger.error(e);
}
