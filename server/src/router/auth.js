const { Router } = require('express');
const authController = require('../controllers/auth');
const router = Router();
const { login, register } = require('../middleware/authValidation');

router.post('/login', login, authController.login);
router.post('/register', register, authController.register);
router.get('/token/refresh', authController.refresh);
router.get('/logout', authController.logout);
module.exports = router;
