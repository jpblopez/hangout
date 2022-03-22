const { Router } = require('express');
const validator = require('@/middleware/schemaValidator');

const { login, register } = require('./validations');
const controller = require('./controller');

const router = Router();

router.post('/login', validator(login), controller.login);
router.post('/register', validator(register), controller.register);

router.get('/token/refresh', controller.refresh);
router.get('/logout', controller.logout);

module.exports = router;
