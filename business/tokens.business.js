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
    revokeToken: (token, revokedByIp, revokedByToken) => TokenModel.updateOne(
      { token },
      {
        revoked: Date.now(),
        revokedByIp,
        revokedByToken,
        isActive: false,
      },
    ).lean(),
    revokeTokenByUseid: (token, revokedByIp, userid) => TokenModel.updateMany(
      { $and: [{ userid }, { token: { $ne: token } }] },
      {
        revoked: Date.now(),
        revokedByIp,
        revokedByToken: token,
        isActive: false,
      },
    ).lean(),
    updateTokenExpire: (token) => TokenModel.updateOne(
      { token },
      {
        isExpired: true,
        isActive: false,
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
