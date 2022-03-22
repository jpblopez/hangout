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
  } catch {
    return next(createError(503, 'No response from server'));
  }

  if (!exist)
    return next(createError(401, 'Invalid email and password combination'));

  const valid = bcrypt.compareSync(password, exist.password);
  if (!valid)
    return next(createError(401, 'Invalid email or password combination'));

  const token = jwt.sign(
    {
      email: exist.email,
      id: exist.id,
    },
    configs.secret,
    {
      expiresIn: 15 * 60,
    }
  );

  const retoken = jwt.sign(
    {
      email: exist.email,
      id: exist.id,
    },
    configs.secret2,
    {
      expiresIn: 3 * 60 * 60,
    }
  );

  await knex.updateToken(exist.id, retoken);

  res.cookie('X-Refresh-Token', retoken, { maxAge: 900000 * 4 * 3 });

  res.status(200).json({
    token,
  });
};

x.register = async (req, res, next) => {
  const { username, email, name, password } = req.body;
  let exist;
  try {
    exist = await knex.getUsers(email);
  } catch {
    return next(createError(503, 'No response from server'));
  }

  if (exist) return next(createError(409, 'Email already exists!'));

  const hash = bcrypt.hashSync(password, 10);
  try {
    await knex.insertUsers(username, email, name, hash);
    res.status(200).send('success');
  } catch (e) {
    return next(e.message);
  }
};

x.refresh = async (req, res, next) => {
  const { cookies } = req;

  if (!cookies['X-Refresh-Token']) {
    const error = createError(401, 'Not Authorized');
    return next(error);
  }
  try {
    let exist = await knex.getToken(cookies['X-Refresh-Token']);
    let token = jwt.sign(
      {
        email: exist.email,
        id: exist.id,
      },
      configs.secret,
      {
        expiresIn: 15 * 60,
      }
    );

    res.status(200).json({
      token,
    });
  } catch {
    return next(createError(503, 'No response from server'));
  }
};

x.logout = (req, res) => {
  res.clearCookie('X-Refresh-Token');
  res.status(200).send('success');
};

module.exports = x;
