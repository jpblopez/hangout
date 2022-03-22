import { Router } from 'express';
import validator from '@/middleware/schemaValidator';
import upload from '@/helpers/multer';
import controller from './controller';
import { createLodging } from './validations';

const router = Router();

router.post(
  '/lodgings',
  upload.single('image'),
  validator(createLodging),
  controller.createLodging
);

export default router;
