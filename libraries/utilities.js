const logger = require('./logger').getLogger();

try {
  module.exports = {
    response: (data) => ({
      data,
      error: false,
      message: null,
    }),
    error: (message) => ({
      data: null,
      error: true,
      message,
    }),
    getIp: (req) => {
      const remoteAddress = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
      return remoteAddress.replace('::ffff:', '');
    },
  };
} catch (e) {
  logger.error(e);
}
