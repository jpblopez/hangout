const { Router } = require('express');
const authController = require('../controllers/auth');
const router = Router();
const { login, register } = require('../middleware/authValidation');

router.post('/login', login, authController.login);
router.post('/register', register, authController.register);

module.exports = router;
