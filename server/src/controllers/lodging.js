const knex = require('../services/lodgingService');
const createError = require('http-errors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

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

x.payment = async (req, res, next) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'PHP',
      description: 'Rent',
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    res.json({ message: 'Payment failed', success: false });
  }
};

module.exports = x;
