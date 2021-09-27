const logger = require('./logger').getLogger();

try {
  module.exports = {
    response: (data) => ({
      data,
      error: false,
      errorMessage: null,
    }),
    error: (errorMessage) => ({
      data: null,
      error: true,
      errorMessage,
    }),
    getIp: (req) => {
      const remoteAddress = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
      return remoteAddress.replace('::ffff:', '');
    },
  };
} catch (e) {
  logger.error(e);
}
