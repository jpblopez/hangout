import { Router } from 'express';

const controller = require('./controller');

const router = Router();

router.get('/', controller.lodgings);
router.get('/:id', controller.lodging);
router.post('/:id/rent', lodgingController.payment);
export default router;
