const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TokenModel = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    userid: {
      type: String,
      required: true,
      index: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
    createdByIp: {
      type: String,
      required: true,
    },
    revoked: {
      type: Date,
    },
    revokedByIp: {
      type: String,
    },
    revokedByToken: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    strict: true,
  },
);

module.exports = mongoose.model('tokens', TokenModel);
