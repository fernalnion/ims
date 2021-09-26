const dotenv = require('dotenv');

dotenv.config();
const { version, description } = require('../package.json');

// import parameters from process env
const {
  MONGODB_CONNECTION_STRING,
  MONGODB_NAME,
  MONGODB_LOGS_NAME,
  APPLICATION_NAME,
  APPLICATION_PORT,
  ENABLE_DEBUG_MODE,
  ENABLE_HTTPS_MODE,
  JWT_SECRET,
  JWT_EXPIRES_IN_MINUTE,
  REFRESH_TOKEN_EXPIRES_IN_MINUTE,
} = process.env;

// make required parameters as single object
const config = {
  MONGODB_CONNECTION_STRING,
  MONGODB_NAME,
  MONGODB_LOGS_NAME,
  APPLICATION_NAME,
  APPLICATION_PORT,
  ENABLE_DEBUG_MODE,
  ENABLE_HTTPS_MODE,
  JWT_SECRET,
  JWT_EXPIRES_IN_MINUTE,
  REFRESH_TOKEN_EXPIRES_IN_MINUTE,
  version,
  title: description,
};

// export object
module.exports = config;
