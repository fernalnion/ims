const lodash = require('lodash');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CustomerModel = new Schema(
  {
    customerid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

CustomerModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ['_id', 'user']);
  },
});
module.exports = mongoose.model('Customer', CustomerModel);
