const lodash = require('lodash');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CategoryModel = new Schema(
  {
    categoryid: {
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
    description: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

CategoryModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ['_id']);
  },
});
module.exports = mongoose.model('Category', CategoryModel);
