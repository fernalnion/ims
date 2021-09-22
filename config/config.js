const dotenv = require('dotenv');

dotenv.config();
const { version, description } = require('../package.json');

// import parameters from process env
const {
  MONGODBCONNECTIONSTRING,
  MONGODBNAME,
  MONGOLOGSNAME,
  APPLICATIONNAME,
  APPLICATIONPORT,
  ENABLEDEBUGMODE,
  ENABLEHTTPSMODE,
} = process.env;

// make required parameters as single object
const config = {
  MONGODBCONNECTIONSTRING,
  MONGODBNAME,
  MONGOLOGSNAME,
  APPLICATIONNAME,
  APPLICATIONPORT,
  ENABLEDEBUGMODE,
  ENABLEHTTPSMODE,
  version,
  title: description,
};

// export object
module.exports = config;
