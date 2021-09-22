const { MONGODBCONNECTIONSTRING, MONGOLOGSNAME, APPLICATIONNAME } = require('../config').config;
const loggerInstance = require('./mongodbLoggerInstance');

class logger {
  constructor() {
    throw new Error('Use logger.getLogger();');
  }

  static getLogger() {
    if (!logger.instance) {
      const loggerConnectionString = `${MONGODBCONNECTIONSTRING}/${MONGOLOGSNAME}`;
      logger.instance = new loggerInstance(
        loggerConnectionString,
        APPLICATIONNAME,
      );
    }
    return logger.instance.logger;
  }
}

module.exports = logger;
