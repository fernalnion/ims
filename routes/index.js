const HeartbeatRoutes = require('./heartbeat.routes');
const RolesRoutes = require('./roles.routes');
const UsersRoutes = require('./users.routes');
const PublicRoutes = require('./public.routes');
const TokenRoutes = require('./tokens.routes');

const routes = {
  HeartbeatRoutes,
  RolesRoutes,
  UsersRoutes,
  PublicRoutes,
  TokenRoutes,
};

module.exports = routes;
