const yup = require('yup');
const createError = require('http-errors');

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
});

exports.login = async (req, res, next) => {
  try {
    if (req.body) {
      await loginSchema.validate(req.body);
      next();
    }
  } catch {
    const error = createError(422, 'Invalid username and password combination');
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    if (req.body) {
      await registerSchema.validate(req.body);
      next();
    }
  } catch {
    const error = createError(422, 'Invalid username and password combination');
    next(error);
  }
};
