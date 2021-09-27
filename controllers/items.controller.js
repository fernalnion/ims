const { v4: uuid4 } = require("uuid");
const lodash = require("lodash");
const logger = require("../libraries/logger").getLogger();
const utilities = require("../libraries/utilities");
const { ItemBusiness } = require("../business");

try {
  module.exports = {
    createItem: async (req, res) => {
      try {
        const document = {
          userid: uuid4(),
          ...req.body,
        };
        const result = await ItemBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateItem: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ["_id", "itemid"]),
        };
        await ItemBusiness.update(req.params.itemid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteItem: async (req, res) => {
      try {
        await ItemBusiness.delete(req.params.itemid);
        return res
          .status(200)
          .send(utilities.response({ itemid: req.params.itemid }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getItem: async (req, res) => {
      try {
        const result = await ItemBusiness.getItem(req.params.itemid);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getItems: async (_, res) => {
      try {
        const result = await ItemBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateQuantity: async (req, res) => {
      try {
        const result = await ItemBusiness.updateQuantity(
          req.params.itemid,
          req.params.quantity
        );
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
