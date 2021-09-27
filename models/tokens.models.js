const lodash = require("lodash");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TokenModel = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    expires: {
      type: Date,
      required: true,
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
    replacedByToken: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

TokenModel.virtual("isExpired").get(function () {
  return Date.now() >= this.expires;
});

TokenModel.virtual("isActive").get(function () {
  return !this.revoked && !this.isExpired;
});

TokenModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ["_id", "user"]);
  },
});
module.exports = mongoose.model("RefreshToken", TokenModel);
