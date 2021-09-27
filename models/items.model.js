const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ItemModel = new Schema(
  {
    itemid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

ItemModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ["_id", "product", "order"]);
  },
});
module.exports = mongoose.model("Item", ItemModel);
