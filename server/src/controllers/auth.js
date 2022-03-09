const knex = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const configs = require('../config/index');
const x = {};

x.login = async (req, res, next) => {
  const { email, password } = req.body;
  let exist;
  try {
    exist = await knex.getUsers(email);
  } catch (e) {
    return next(e.message);
  }

  const error = createError(401, 'Invalid username and password combination');

  if (!exist) return next(error);

  const valid = bcrypt.compareSync(password, exist.password);
  if (!valid) return next(error);

  const token = jwt.sign(
    {
      email: exist.email,
      id: exist.id,
    },
    configs.secret,
    {
      expiresIn: 60 * 60 * 3,
    }
  );

  res.status(200).json({
    token,
  });
};

x.register = async (req, res, next) => {
  const { email, name, password } = req.body;
  let exist;
  try {
    exist = await knex.getUsers(email);
    res.status(200).send('Unique');
  } catch (e) {
    return next(e.message);
  }
  if (exist) return next(createError(409, 'Username already exists!'));

  const hash = bcrypt.hashSync(password, 10);
  try {
    await knex.insertUsers(email, name, hash);
    res.status(200).send('success');
  } catch (e) {
    return next(e.message);
  }
};

module.exports = x;
