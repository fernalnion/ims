const RoleController = require('./roles.controller');
const UserController = require('./users.controller');
const CustomerController = require('./customers.controller');
const SupplierController = require('./suppliers.controller');
const CategoryController = require('./catogories.controller');
const ProductController = require('./products.controller');
const PaymentController = require('./payments.controller');

const controllers = {
  RoleController,
  UserController,

  CustomerController,
  SupplierController,

  CategoryController,
  ProductController,
  PaymentController,
};

module.exports = controllers;
