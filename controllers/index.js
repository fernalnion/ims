const RoleController = require('./roles.controller');
const UserController = require('./users.controller');
const CustomerController = require('./customers.controller');
const SupplierController = require('./suppliers.controller');
const CategoryController = require('./catogories.controller');
const ProductController = require('./products.controller');
const PaymentController = require('./payments.controller');
const ItemController = require('./items.controller');
const OrderController = require('./orders.controller');

const controllers = {
  RoleController,
  UserController,

  CustomerController,
  SupplierController,

  CategoryController,
  ProductController,
  PaymentController,
  ItemController,
  OrderController,
};

module.exports = controllers;
