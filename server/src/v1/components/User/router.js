const router = require('express').Router();
const createValidator = require('@/middleware/createLodgingValidation');
const upload = require('@/helpers/multer');
const controller = require('./controller');

router.post('/lodgings', upload.single('image'), createValidator, controller.createLodging);

module.exports = router;
