const HeartbeatRoutes = require('./heartbeat.routes');
const RolesRoutes = require('./roles.routes');
const UsersRoutes = require('./users.routes');
const PublicRoutes = require('./public.routes');

const routes = {
  HeartbeatRoutes,
  RolesRoutes,
  UsersRoutes,
  PublicRoutes,
};

module.exports = routes;
