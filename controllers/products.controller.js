const { v4: uuid4 } = require('uuid');
const lodash = require('lodash');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { ProductBusiness } = require('../business');

try {
  module.exports = {
    createProduct: async (req, res) => {
      try {
        const document = {
          userid: uuid4(),
          ...req.body,
        };
        const isexist = await ProductBusiness.getProduct(null, document.name);
        if (isexist) {
          return res
            .status(500)
            .send(utilities.error(`Product already exists(${document.name})`));
        }
        const result = await ProductBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateProduct: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ['_id', 'productid']),
        };
        await ProductBusiness.update(req.params.productid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteProduct: async (req, res) => {
      try {
        await ProductBusiness.delete(req.params.productid);
        return res
          .status(200)
          .send(utilities.response({ productid: req.params.productid }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getProduct: async (req, res) => {
      try {
        const result = await ProductBusiness.getProduct(req.params.productid);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getProducts: async (_, res) => {
      try {
        const result = await ProductBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateQuantity: async (req, res) => {
      try {
        const result = await ProductBusiness.updateQuantity(
          req.params.productid,
          req.params.quantity,
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
