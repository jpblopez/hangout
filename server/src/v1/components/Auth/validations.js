const yup = require('yup');

const login = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const register = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
});

export { login, register };
