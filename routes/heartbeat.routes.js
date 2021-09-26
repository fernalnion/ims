const router = require('express').Router();
const { title } = require('../config').config;
const logger = require('../libraries/logger').getLogger();

try {
  /**
   * @swagger
   * tags:
   *   name: Heartbeat
   *   description: Heartbeat Group
   */

  /**
   * @swagger
   * /heartbeat:
   *  get:
   *    summary: Get appliation heartbeat
   *    tags: [Heartbeat]
   *    responses:
   *      200:
   *        description: Get application health status
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *
   */
  router.get('/', (_, res) => {
    res.status(200).json({ message: `Welcome to ${title}` });
  });

  module.exports = router;
} catch (e) {
  logger.error(e);
}
