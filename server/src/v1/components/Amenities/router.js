import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/', controller.get);
router.get('/:id', controller.getSpecific);

export default router;
