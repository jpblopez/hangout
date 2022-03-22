const router = require('express').Router();
const controller = require('../../controllers/v2/amenities');

router.get('', controller.get);
router.get('/:id', controller.getSpecific);

module.exports = router;
