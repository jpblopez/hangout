const express = require('express')
const router = express.Router()

const amenities = require('./amenities')
const user = require('./user')

router.use('/user', user)
router.use('/amenities', amenities)

module.exports = router