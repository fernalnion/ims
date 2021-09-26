const { MONGODB_CONNECTION_STRING, MONGODB_LOGS_NAME, APPLICATION_NAME } = require('../config').config;
const loggerInstance = require('./mongodbLoggerInstance');

class logger {
  constructor() {
    throw new Error('Use logger.getLogger();');
  }

  static getLogger() {
    if (!logger.instance) {
      const loggerConnectionString = `${MONGODB_CONNECTION_STRING}/${MONGODB_LOGS_NAME}`;
      logger.instance = new loggerInstance(
        loggerConnectionString,
        APPLICATION_NAME,
      );
    }
    return logger.instance.logger;
  }
}

module.exports = logger;
