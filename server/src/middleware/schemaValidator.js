import createError from 'http-errors';

function schemaValidator(schema) {
  return async function validator(req, res, next) {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      next(createError(422, error.message));
    }
  };
}

export default schemaValidator;
