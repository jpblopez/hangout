const knex = require('../../db/knex')
const createError = require('http-errors')
const service = require('../../services/amenitiesService')

const x = {}

x.get = async (req, res, next) => {
    try {
        const amenities = await service.getAll()
        return res.status(200).json({
            amenities
        })
    } catch (error) {
        next(error)
    }
}


module.exports = x