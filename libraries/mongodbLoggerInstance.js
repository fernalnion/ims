const winston = require('winston');
require('winston-mongodb');
const ip = require('ip');
const os = require('os');

const debugfilter = winston.format((info) => (info.level === 'debug' ? info : false));
const infoFilter = winston.format((info) => (info.level === 'info' || info.level === 'warn' ? info : false));
const errorFilter = winston.format((info) => (info.level === 'error' ? info : false));

class loggerInstance {
  constructor(loggerConnectionString, APPLICATION_NAME) {
    const exceptionHandlers = [
      new winston.transports.MongoDB({
        db: loggerConnectionString,
        name: 'exceptionlog',
        indexPrefix: `${APPLICATION_NAME}-exception`,
        level: 'error',
        collection: 'exceptionlog',
        capped: true,
        tryReconnect: true,
        storeHost: true,
        leaveConnectionOpen: false,
        handleExceptions: true,
        json: true,
        format: winston.format.combine(
          winston.format.json(),
          winston.format.timestamp(),
          winston.format.errors({
            stack: true,
          }),
          winston.format.metadata(), /* add this line if you dont have it */
        ),
      }),
    ];

    // Separate warn/error
    const transports = [
      new winston.transports.MongoDB({
        db: loggerConnectionString,
        name: 'infolog',
        indexPrefix: `${APPLICATION_NAME}-info`,
        level: 'info',
        collection: 'infolog',
        capped: true,
        tryReconnect: true,
        storeHost: true,
        leaveConnectionOpen: false,
        json: true,
        handleExceptions: false,
        format: winston.format.combine(
          infoFilter(),
          winston.format.json(),
          winston.format.timestamp(),
          winston.format.errors({
            stack: true,
          }),
          winston.format.metadata(), /* add this line if you dont have it */
        ),
      }),
      new winston.transports.MongoDB({
        db: loggerConnectionString,
        name: 'debuglog',
        indexPrefix: `${APPLICATION_NAME}-debug`,
        level: 'debug',
        collection: 'debuglog',
        capped: true,
        tryReconnect: true,
        storeHost: true,
        leaveConnectionOpen: false,
        json: true,
        handleExceptions: false,
        format: winston.format.combine(
          debugfilter(),
          winston.format.json(),
          winston.format.timestamp(),
          winston.format.errors({
            stack: true,
          }),
          winston.format.metadata(), /* add this line if you dont have it */
        ),
      }),
      new winston.transports.MongoDB({
        db: loggerConnectionString,
        name: 'errorlog',
        indexPrefix: `${APPLICATION_NAME}-error`,
        level: 'error',
        collection: 'errorlog',
        capped: true,
        tryReconnect: true,
        storeHost: true,
        leaveConnectionOpen: false,
        json: true,
        handleExceptions: false,
        format: winston.format.combine(
          errorFilter(),
          winston.format.json(),
          winston.format.timestamp(),
          winston.format.errors({
            stack: true,
          }),
          winston.format.metadata(), /* add this line if you dont have it */
        ),
      }),
    ];

    this.logger = winston.createLogger({
      exceptionHandlers,
      transports,
      exitOnError: false,
      defaultMeta: {
        application: APPLICATION_NAME,
        hostname: os.hostname(),
        ipaddress: ip.address(),
      },
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.errors({
          stack: true,
        }),
        winston.format.metadata(), /* add this line if you dont have it */
      ),
    });
  }
}

module.exports = loggerInstance;
