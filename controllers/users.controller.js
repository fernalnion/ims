const { v4: uuid4 } = require("uuid");
const bcryptjs = require("bcryptjs");
const lodash = require("lodash");
const logger = require("../libraries/logger").getLogger();
const utilities = require("../libraries/utilities");
const { UserBusiness } = require("../business");
const { JWT_EXPIRES_IN_MINUTE } = require("../config").config;
const { RolesEnum } = require("../enums");

try {
  const setTokenCookie = (res, token) => {
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(JWT_EXPIRES_IN_MINUTE, 10) * 1000
      ),
    };
    res.cookie("refreshToken", token, cookieOptions);
  };

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
          document.email
        );
        if (isexist) {
          return res
            .status(500)
            .send(
              utilities.error(
                `User already exists(${document.username} / ${document.username})`
              )
            );
        }
        const result = await UserBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    loginUser: async (req, res) => {
      try {
        const user = await UserBusiness.getUser(
          null,
          req.body.username,
          req.body.email
        );

        const isPasswordValid = bcryptjs.compareSync(
          req.body.password,
          user.passwordhash
        );
        if (!isPasswordValid) {
          return res
            .status(500)
            .send(utilities.error("Invalid username/password!"));
        }

        const remoteAddress = utilities.getIp(req);
        const jwtToken = UserBusiness.jwtToken(user);
        const refreshToken = UserBusiness.generateRefreshToken(
          user,
          remoteAddress
        );
        await refreshToken.save();
        setTokenCookie(res, refreshToken.token);
        return res.status(200).send(
          utilities.response({
            token: jwtToken,
            refreshToken: refreshToken.token,
          })
        );
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateUser: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ["_id", "userid", "password"]),
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
        const result = await UserBusiness.getUser(req.params.userid);
        return res
          .status(200)
          .send(
            utilities.response(lodash.omit(result, ["_id", "passwordhash"]))
          );
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getUsers: async (_, res) => {
      try {
        const result = (await UserBusiness.getAll()).map((m) =>
          lodash.omit(m, ["_id", "passwordhash"])
        );
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },

    refreshToken: (req, res, next) => {
      const token = req.cookies.refreshToken;
      const ipAddress = utilities.getIp(req);
      UserBusiness.refreshToken({ token, ipAddress })
        .then((tokendata) => {
          setTokenCookie(res, tokendata.refreshToken);
          res.json(tokendata);
        })
        .catch(next);
    },

    revokeToken: (req, res, next) => {
      // accept token from request body or cookie
      const token = req.body.token || req.cookies.refreshToken;
      const ipAddress = utilities.getIp(req);
      if (!token)
        return res.status(400).send(utilities.error("Token is required"));

      // users can revoke their own tokens and admins can revoke any tokens
      if (
        !req.user.ownsToken(token) &&
        req.user.roleid !== RolesEnum.admin.roleid
      ) {
        return res.status(401).send(utilities.error("Unauthorized"));
      }

      UserBusiness.revokeToken({ token, ipAddress })
        .then(() => res.status(200).send(utilities.error("Token revoked")))
        .catch(next);
    },

    getRefreshTokens: (req, res, next) => {
      // users can get their own refresh tokens and admins can get any user's refresh tokens
      if (
        req.params.userid !== req.user.userid &&
        req.user.role !== RolesEnum.admin.roleid
      ) {
        return res.status(401).send(utilities.error("Unauthorized"));
      }

      UserBusiness.getRefreshTokens(req.user._id)
        .then((tokens) =>
          tokens
            ? res.status(200).send(utilities.response(tokens))
            : res.sendStatus(404)
        )
        .catch(next);
    },
  };
} catch (e) {
  logger.error(e);
}
