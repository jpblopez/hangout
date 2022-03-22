import { Router } from 'express';

const controller = require('./controller');

const router = Router();

router.get('/', controller.lodgings);
router.get('/:id', controller.lodging);

export default router;
