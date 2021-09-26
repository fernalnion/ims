const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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
    strict: true,
  },
);

module.exports = mongoose.model('users', UserModel);
