import { Router } from 'express';
import { router as amenities } from 'v1/components/Amenities';
import { router as auth } from 'v1/components/Auth';
import { router as lodging } from 'v1/components/Lodging';
import { router as user } from 'v1/components/User';

const router = Router();

router.use('/auth', auth);
router.use('/amenities', amenities);
router.use('/lodging', lodging);
router.use('/user', user);

export default router;
