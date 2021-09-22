const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RoleModel = new Schema(
  {
    roleid: {
      type: String,
      required: true,
      index: true,
    },
    rolename: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    strict: true,
  }
);

module.exports = mongoose.model("roles", RoleModel);
