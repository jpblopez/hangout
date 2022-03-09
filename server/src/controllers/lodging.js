const knex = require('../services/lodgingService');
const createError = require('http-errors');

const x = {};

x.lodgings = async (req, res, next) => {
  let lodgings;
  try {
    lodgings = await knex.getLodgings();
  } catch {}
  res.status(200).json({
    lodgings,
  });
};

x.lodging = async (req, res, next) => {
  let lodgings;
  try {
    lodgings = await knex.getLodging(req.params.id);
  } catch {
    const error = createError(404, 'Not found');
    return next(error);
  }
  res.status(200).json(lodgings);
};

module.exports = x;
