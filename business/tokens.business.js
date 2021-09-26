const logger = require('../libraries/logger').getLogger();
const { TokenModel } = require('../models');

try {
  module.exports = {
    newToken: (token, expires, createdByIp, userid) => TokenModel.create({
      token,
      expires,
      createdByIp,
      userid,
    }),
    revokeToken: (token, revokedByIp, revokedByToken) => TokenModel.findOneAndUpdate(
      { token },
      {
        token,
        revoked: Date.now(),
        revokedByIp,
        revokedByToken,
        isActive: false,
      },
      {
        upsert: true,
        new: false,
      },
    ).lean(),
    updateTokenExpire: (token) => TokenModel.findOneAndUpdate(
      { token },
      {
        token,
        isExpired: true,
        isActive: false,
      },
      {
        upsert: true,
        new: false,
      },
    ).lean(),
    delete: (token) => TokenModel.deleteOne({ token }),
    getTokenByUserId: (token, userid) => TokenModel.find({ $or: [{ token }, { userid }] }).lean(),
    getToken: (token) => TokenModel.findOne({ token }).lean(),
    getAll: () => TokenModel.find({}).lean(),
  };
} catch (e) {
  logger.error(e);
}
