const knex = require('../db/knex')

const x = {}


x.getAll = async () => {
    return knex('amenities').select()
}


module.exports = x