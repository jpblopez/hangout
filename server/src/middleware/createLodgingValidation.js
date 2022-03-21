const yup = require('yup');

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  location: yup.string().required('Location is required'),
  rate: yup.number().required('Rate is required').min(1),
  amenities: yup.array().of(yup.number()).min(0),
});

module.exports = async (req, res, next) => {
  try {
    if (req.body) {
      await schema.validate(req.body);
      next();
    }
  } catch (err) {
    const error = createError(422, err.message);
    next(error);
  }
};
