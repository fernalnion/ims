const lodash = require("lodash");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { RolesEnum } = require("../enums");

const UserModel = new Schema(
  {
    userid: {
      type: String,
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    passwordhash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    roleid: {
      type: String,
      required: true,
      enum: Object.values(RolesEnum).map((m) => m.roleid),
    },
    dob: {
      type: Date,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

UserModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    // remove these props when object is serialized
    return lodash.omit(ret, ["_id", "passwordhash"]);
  },
});
module.exports = mongoose.model("User", UserModel);
