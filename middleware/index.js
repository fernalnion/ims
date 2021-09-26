const authJwtMiddleware = require('./authjwt.middleware');
const rolesMiddleware = require('./roles.middleware');

const middleware = {
  authJwtMiddleware,
  rolesMiddleware,
};

module.exports = middleware;
