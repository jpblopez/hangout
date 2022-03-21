const router = require('express').Router()
const controller = require('../../controllers/v2/amenities')

router.get('', controller.get)


module.exports = router