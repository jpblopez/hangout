const service = require('v1/components/Lodging/service');
const userService = require('v1/components/Auth/service');

const jwt = require('jsonwebtoken');
const config = require('@/config');
const createError = require('http-errors');

const x = {};

x.createLodging = async (req, res, next) => {
  try {
    const token = jwt.verify(req.headers.authorization, config.secret);

    if (!token) return next(createError(403, 'Missing authorization token'));

    const user = await userService.getUsers(token.email);

    if (token.id !== user.id) return next(createError(401, 'Unauthorized'));

    const { body } = req;

    await service.createLodging({
      ...body,
      owner: token.id,
      image: req.file.path,
    });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

x.myLodging = async (req, res, next) => {
  try {
    const token = jwt.verify(req.headers['authorization'], config.secret);

    if (!token) return next(createError(403, 'Missing authorization token'));

    const user = await userService.getUsers(token.email);

    if (token.id !== user.id) return next(createError(401, 'Unauthorized'));

    const lodgings = await service.getUserLodgings(token.id);
    res.status(200).json({
      lodgings,
    });
  } catch {}
};

module.exports = x;
