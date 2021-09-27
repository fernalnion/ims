const { v4: uuid4 } = require('uuid');
const lodash = require('lodash');
const logger = require('../libraries/logger').getLogger();
const utilities = require('../libraries/utilities');
const { CategoryBusiness } = require('../business');

try {
  module.exports = {
    createCategory: async (req, res) => {
      try {
        const document = {
          categoryid: uuid4(),
          ...req.body,
        };
        const isexist = await CategoryBusiness.getCategory(null, document.name);
        if (isexist) {
          return res
            .status(500)
            .send(utilities.error(`Category already exists(${document.name})`));
        }
        const result = await CategoryBusiness.create(document);
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    updateCategory: async (req, res) => {
      try {
        const document = {
          ...lodash.omit(req.body, ['_id', 'categoryid']),
        };
        await CategoryBusiness.update(req.params.categoryid, document);
        return res.status(200).send(utilities.response(true));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    deleteCategory: async (req, res) => {
      try {
        await CategoryBusiness.delete(req.params.categoryid);
        return res
          .status(200)
          .send(utilities.response({ categoryid: req.params.categoryid }));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getCategory: async (req, res) => {
      try {
        const result = await CategoryBusiness.getCategory(
          req.params.categoryid,
        );
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
    getCategories: async (_, res) => {
      try {
        const result = await CategoryBusiness.getAll();
        return res.status(200).send(utilities.response(result));
      } catch (e) {
        return res.status(500).send(utilities.error(e.message));
      }
    },
  };
} catch (e) {
  logger.error(e);
}
