const logger = require("./logger").getLogger();
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
  };
} catch (e) {
  logger.error(e);
}
