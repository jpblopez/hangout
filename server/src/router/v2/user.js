const router = require('express').Router();
const createValidator = require('../../middleware/createLodgingValidation');
const controller = require('../../controllers/v2/user');
const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.resolve(__dirname, '../../../uploads'),
});

router.post(
  '/lodgings',
  upload.single('image'),
  createValidator,
  controller.createLodging
);

module.exports = router;
