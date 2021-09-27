const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PaymentModel = new Schema(
  {
    paymentid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    otherDetails: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

PaymentModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    return lodash.omit(ret, ["_id"]);
  },
});
module.exports = mongoose.model("Payment", PaymentModel);
