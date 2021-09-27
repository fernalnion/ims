const RoleBusiness = require('./roles.business');
const UserBusiness = require('./users.business');
const CustomerBusiness = require('./customers.business');
const SupplierBusiness = require('./suppliers.business');
const CategoryBusiness = require('./categories.business');
const ProductBusiness = require('./products.business');

const business = {
  RoleBusiness,
  UserBusiness,

  CustomerBusiness,
  SupplierBusiness,

  CategoryBusiness,
  ProductBusiness,
};

module.exports = business;
