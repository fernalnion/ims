const UserModel = require('./users.model');
const TokenModel = require('./tokens.models');

const SupplierModel = require('./suppliers.model');
const CustomerModel = require('./customers.model');

const CategoryModel = require('./categories.model');
const ProductModel = require('./products.model');
const ItemModel = require('./items.model');
const OrderModel = require('./orders.model');
const PaymentModel = require('./payments.model');

const models = {
  UserModel,
  TokenModel,
  SupplierModel,
  CustomerModel,
  CategoryModel,
  ProductModel,
  ItemModel,
  OrderModel,
  PaymentModel,
};

module.exports = models;
