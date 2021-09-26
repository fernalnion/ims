const logger = require('./logger').getLogger();

try {
  module.exports = {
    response: (data) => ({
      data,
      error: false,
      errormessage: null,
    }),
    error: (errormessage) => ({
      data: null,
      error: true,
      errormessage,
    }),
    getIp: (req) => {
      const remoteAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      return remoteAddress.replace('::ffff:', '');
    },
  };
} catch (e) {
  logger.error(e);
}
