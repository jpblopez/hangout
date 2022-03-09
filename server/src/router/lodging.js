const { Router } = require('express');
const lodgingController = require('../controllers/lodging');
const router = Router();

router.get('/lodging', lodgingController.lodgings);
router.get('/lodging/:id', lodgingController.lodging);

module.exports = router;
