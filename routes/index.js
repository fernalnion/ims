const HeartbeatRoutes = require('./heartbeat.routes');
const RolesRoutes = require('./roles.routes');
const UsersRoutes = require('./users.routes');
const PublicRoutes = require('./public.routes');

const SupplierRoutes = require('./suppliers.routes');
const CustomerRoutes = require('./customers.routes');

const CategoryRoutes = require('./categories.routes');
const ProductRoutes = require('./products.routes');
const PaymentRoutes = require('./paymets.routes');
const ItemRoutes = require('./items.routes');
const OrderRoutes = require('./orders.routes');

const routes = {
  HeartbeatRoutes,
  RolesRoutes,
  UsersRoutes,
  PublicRoutes,

  CustomerRoutes,
  SupplierRoutes,

  CategoryRoutes,
  ProductRoutes,
  PaymentRoutes,
  ItemRoutes,
  OrderRoutes
};

module.exports = routes;
