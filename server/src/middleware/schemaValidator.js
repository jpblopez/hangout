import createError from 'http-errors';

const schemaValidator = schema => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    next(createError(422, error.message));
  }
};

export default schemaValidator;
