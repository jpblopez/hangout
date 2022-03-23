const { Router } = require('express');
const lodgingController = require('../controllers/lodging');
const router = Router();

router.get('/', lodgingController.lodgings);
router.get('/:id', lodgingController.lodging);
router.post('/:id/rent', lodgingController.payment);

module.exports = router;
