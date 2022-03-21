const express = require('express')
const router = express.Router()

const amenities = require('./amenities')

router.use('/amenities', amenities)

module.exports = router