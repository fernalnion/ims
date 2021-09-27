const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OrderModel = new Schema(
  {
    orderid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    dateOfOrder: {
      type: Date,
      required: true,
      unique: true,
      index: true,
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
    otherDetails: {
      type: String,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

OrderModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ["_id", "customer", "payment"]);
  },
});
module.exports = mongoose.model("Order", OrderModel);
