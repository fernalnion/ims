const lodash = require('lodash');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { TokenBusiness } = require('../business');

try {
  module.exports = {
    revokeToken: async (req, res) => {
      try {
        const remoteAddress = utilities.getIp(req);
        await TokenBusiness.revokeToken(
          req.body.token,
          remoteAddress,
          req.token,
        );
        return res.status(200).send(utilities.response('Token revoked!'));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getTokenByUserid: async (req, res) => {
      try {
        const result = (
          await TokenBusiness.getTokenByUserId(null, req.user.userid)
        ).map((token) => lodash.omit(token, ['_id']));
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getToken: async (req, res) => {
      try {
        const result = lodash.omit(
          await TokenBusiness.getToken(req.params.token),
          ['_id'],
        );
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getTokens: async (_, res) => {
      try {
        const result = (await TokenBusiness.getAll()).map((token) => lodash.omit(token, ['_id']));
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
