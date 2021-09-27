const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwttoken = require("jsonwebtoken");
const lodash = require("lodash");
const logger = require("../libraries/logger").getLogger();
const { UserModel, TokenModel } = require("../models");
const { JWT_SECRET, JWT_EXPIRES_IN_MINUTE, REFRESH_TOKEN_EXPIRES_IN_MINUTE } =
  require("../config").config;

try {
  // methods
  const randomTokenString = () => crypto.randomBytes(64).toString("hex");

  const getRefreshToken = async (token) => {
    const refreshToken = await TokenModel.findOne({ token }).populate("user");
    if (!refreshToken || !refreshToken.isActive)
      throw new Error("Invalid token");
    return refreshToken;
  };

  const generateJwtToken = (user) =>
    jwttoken.sign({ userid: user.userid }, JWT_SECRET, {
      expiresIn: parseInt(JWT_EXPIRES_IN_MINUTE, 10),
    });

  const generateRefreshToken = (user, ipAddress) =>
    new TokenModel({
      user: user._id,
      token: randomTokenString(),
      expires: new Date(
        Date.now() + parseInt(REFRESH_TOKEN_EXPIRES_IN_MINUTE, 10)
      ),
      createdByIp: ipAddress,
    });

  const basicDetails = (user) => lodash.omit(user, ["passwordhash"]);

  // module exports
  module.exports = {
    create: async (document) => {
      const passwordhash = bcrypt.hashSync(document.password, 8);
      const user = await UserModel.create({ ...document, passwordhash });
      return basicDetails(user._doc);
    },
    update: async (userid, document) => {
      const user = await UserModel.findOneAndUpdate({ userid }, document, {
        upsert: true,
        new: false,
      }).lean();
      return basicDetails(user);
    },
    delete: (userid) => UserModel.deleteOne({ userid }),
    getUser: async (userid, username, email) => {
      const user = await UserModel.findOne({
        $or: [{ userid }, { username }, { email }],
      }).lean();
      return user;
    },
    getAll: async () => {
      const users = await UserModel.find({}).lean();
      return users.map((user) => basicDetails(user));
    },
    revokeToken: async ({ token, ipAddress }) => {
      const refereshToken = await getRefreshToken(token);

      // revoke token and save
      refereshToken.revoked = Date.now();
      refereshToken.revokedByIp = ipAddress;
      await refereshToken.save();
    },
    refreshToken: async ({ token, ipAddress }) => {
      const refreshToken = await getRefreshToken(token);
      const { user } = refreshToken;

      // replace old refresh token with a new one and save
      const newRefreshToken = generateRefreshToken(user, ipAddress);
      refreshToken.revoked = Date.now();
      refreshToken.revokedByIp = ipAddress;
      refreshToken.replacedByToken = newRefreshToken.token;
      await refreshToken.save();
      await newRefreshToken.save();

      // generate new jwt
      const jwtToken = generateJwtToken(user);
      // return basic details and tokens
      return {
        token: jwtToken,
        refreshToken: newRefreshToken.token,
      };
    },
    getRefreshTokens: async (usreid) => {
      const isuserExist = await UserModel.findOne({ usreid });
      if (!isuserExist) throw new Error("User not found");

      // return refresh tokens for user
      const refreshTokens = await TokenModel.find({ userid: usreid });
      return refreshTokens;
    },

    jwtToken: (user) => generateJwtToken(user),
    generateRefreshToken: (user, ipAddress) =>
      generateRefreshToken(user, ipAddress),
    userBasicDetails: (user) => basicDetails(user),
  };
} catch (e) {
  logger.error(e);
}
