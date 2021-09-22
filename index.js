// express
const compression = require("compression");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// swagger
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// http & https, filesystem library
const http = require("http");
const https = require("https");
const fs = require("fs");

// routes
const { HeartbeatRoutes, RoleRoutes } = require("./routes");

// logger
const db = require('./libraries/db');
const logger = require("./libraries/logger").getLogger();

const {
  // version, title,
  APPLICATIONPORT,
  ENABLEHTTPSMODE,
} = require("./config").config;

try {
  const app = express();
  db.connect();

  // parse requests of content-type - application/json
  app.use(cors());
  app.use(bodyParser.json({ limit: "200mb" }));
  app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
  app.use(compression());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

  // attach swagger docs with express
  // const swaggerDocOptions = {
  //   swaggerDefinition: {
  //     openapi: "3.0.0",
  //     info: {
  //       title,
  //       version,
  //       description:
  //         "this is a REST Application made for Inventry Management System. It retrieves data from dependency servers.",
  //     },
  //   },
  //   components: {
  //     securitySchemes: {
  //       bearerAuth: {
  //         type: "http",
  //         scheme: "bearer",
  //         in: "header",
  //         bearerFormat: "JWT",
  //       },
  //     },
  //   },
  //   security: [
  //     {
  //       bearerAuth: [],
  //     },
  //   ],
  //   swagger: "2.0",
  //   // Paths to files containing OpenAPI definitions
  //   apis: ["./routes/*.js"],
  // };

  // const swaggerUiOptions = {
  //   explorer: true,
  //   swaggerOptions: {
  //     validatorUrl: null,
  //   },
  // };

  // const swaggerSpec = swaggerJSDoc(swaggerDocOptions);
  // app.use(
  //   "/api-docs",
  //   swaggerUi.serve,
  //   swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  // );
  app.use("/heartbeat", HeartbeatRoutes);
  app.use("/roles", RoleRoutes);

  // create server basred on flag
  const server =
    JSON.parse(ENABLEHTTPSMODE) === true
      ? https.createServer(
          {
            key: fs.readFileSync("./certificates/server.key"),
            cert: fs.readFileSync("./certificates/server.cert"),
          },
          app
        )
      : http.createServer(app);
  server.listen(APPLICATIONPORT, () => {
    logger.info(`API is running under port number -> ${APPLICATIONPORT}`);
  });
} catch (e) {
  logger.error(e);
}
