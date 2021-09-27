const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProductModel = new Schema(
  {
    productid: {
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
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    otherDetails: {
      type: String,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

ProductModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ["_id", "supplier", "category"]);
  },
});
module.exports = mongoose.model("Product", ProductModel);
