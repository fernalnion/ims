const jwttoken = require('jsonwebtoken');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { UserBusiness } = require('../business');
const { JWT_SECRET } = require('../config').config;

try {
  module.exports = {
    validateToken: async (req, res, next) => {
      const tokendata = req?.headers?.authorization;
      if (!req || !tokendata) {
        return res.status(401).send(utilities.error('Unauthorized!'));
      }

      const [tokenprefix, token] = tokendata.split(' ');
      if (!tokenprefix === 'Bearer' || !token) {
        return res.status(401).send(utilities.error('No token provided!'));
      }
      jwttoken.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).send(utilities.error('Unauthorized!'));
        }

        // authentication and authorization successful
        req.user = await UserBusiness.getUser(decoded.userid);
        const refreshTokens = await UserBusiness.getRefreshTokens(req.user._id);
        req.user.ownsToken = (temptoken) => !!refreshTokens.find((x) => x.token === temptoken);
        next();
      });
    },
  };
} catch (e) {
  logger.error(e);
}
