const mongoose = require('mongoose');
const { MONGODB_CONNECTION_STRING, MONGODB_NAME, ENABLE_DEBUG_MODE } = require('../config').config;
const logger = require('./logger').getLogger();

try {
  module.exports = {
    connect: () => {
      const option = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        dbName: MONGODB_NAME,
      };
      mongoose.connect(MONGODB_CONNECTION_STRING, option);
      mongoose.Promise = global.Promise;

      if (JSON.parse(ENABLE_DEBUG_MODE) === true) {
        mongoose.set('debug', true);
      }

      // moongoose events
      mongoose.connection.on('connected', () => {
        logger.info('Mongoose default connection is open', MONGODB_CONNECTION_STRING);
      });

      mongoose.connection.on('disconnected', () => {
        logger.info('Mongoose default connection is disconnected');
      });

      mongoose.connection.on('error', (err) => {
        logger.error(`Mongoose default connection has occured ${err} error`);
      });

      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          logger.info(
            'Mongoose default connection is disconnected due to application termination',
          );
          process.exit(0);
        });
      });
    },
  };
} catch (e) {
  logger.error(e);
}
