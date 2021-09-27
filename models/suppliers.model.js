const lodash = require('lodash');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const SupplierModel = new Schema(
  {
    supplierid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
    otherDetails: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

SupplierModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ['_id']);
  },
});
module.exports = mongoose.model('Supplier', SupplierModel);
