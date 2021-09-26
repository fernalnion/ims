const { v4: uuid4 } = require('uuid');
const bcryptjs = require('bcryptjs');
const jwttoken = require('jsonwebtoken');
const lodash = require('lodash');
const { addSeconds } = require('date-fns');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { UserBusiness, TokenBusiness } = require('../business');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config').config;

try {
  module.exports = {
    createUser: async (req, res) => {
      try {
        const document = {
          userid: uuid4(),
          ...req.body,
        };
        const isexist = await UserBusiness.getUser(
          null,
          document.username,
          document.email,
        );
        if (isexist) {
          return res
            .status(500)
            .send(
              utilities.error(
                `User already exists(${document.username} / ${document.username})`,
              ),
            );
        }
        const result = await UserBusiness.create(document);
        return res.status(200).send(utilities.response({ ...result._doc }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    loginUser: async (req, res) => {
      try {
        const user = await UserBusiness.getUser(
          null,
          req.body.username,
          req.body.email,
        );

        const isPasswordValid = bcryptjs.compareSync(
          req.body.password,
          user.passwordhash,
        );
        if (!isPasswordValid) {
          return res
            .status(500)
            .send(utilities.error('Invalid username/password!'));
        }

        const jwttokenexpires = parseInt(JWT_EXPIRES_IN, 10);
        const token = jwttoken.sign({ userid: user.userid }, JWT_SECRET, {
          expiresIn: jwttokenexpires, // 1day
        });

        // update old token & create new
        const remoteAddress = utilities.getIp(req);
        const expires = addSeconds(new Date(), jwttokenexpires);
        await TokenBusiness.newToken(
          token,
          expires,
          remoteAddress,
          user.userid,
        );

        return res.status(200).send(utilities.response({ token }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateUser: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ['_id', 'userid', 'password']),
        };
        await UserBusiness.update(req.params.userid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteUser: async (req, res) => {
      try {
        await UserBusiness.delete(req.params.userid);
        return res
          .status(200)
          .send(utilities.response({ userid: req.params.userid }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getUser: async (req, res) => {
      try {
        const result = await UserBusiness.getRole(req.params.userid);
        return res
          .status(200)
          .send(
            utilities.response(lodash.omit(result, ['_id', 'passwordhash'])),
          );
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getUsers: async (_, res) => {
      try {
        const result = (await UserBusiness.getAll()).map((m) => lodash.omit(m, ['_id', 'passwordhash']));
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
