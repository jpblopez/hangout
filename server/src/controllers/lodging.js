const knex = require('../services/lodgingService');
const createError = require('http-errors');

const x = {};

x.lodgings = async (req, res, next) => {
  let lodgings;
  try {
    lodgings = await knex.getLodgings();
  } catch {
    return next(createError(503, 'No response from server'));
  }
  res.status(200).json({
    lodgings,
  });
};

x.lodging = async (req, res, next) => {
  let lodgings;
  try {
    lodgings = await knex.getLodging(req.params.id);
  } catch {
    return next(createError(404, 'Not found'));
  }
  res.status(200).json(lodgings);
};

module.exports = x;
