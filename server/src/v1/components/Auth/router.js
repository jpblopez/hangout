import { Router } from 'express';
import validator from '@/middleware/schemaValidator';
import { login, register } from './validations';
import controller from './controller';

const router = Router();

router.post('/login', validator(login), controller.login);
router.post('/register', validator(register), controller.register);

router.get('/token/refresh', controller.refresh);
router.get('/logout', controller.logout);

export default router;
