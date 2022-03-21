const knex = require('../db/knex');
const amenity = require('./amenitiesService')

const x = {};

x.getLodgings = async () => {
  let result = await knex.select().table('listing');
  return result;
};

x.getLodging = async id => {
  let result = await knex
    .select('description', 'image', 'location', 'owner', 'rate', 'title')
    .table('listing')
    .where('id', parseInt(id))
    .first();

  return result;
};

// todo create lodging_amenities table

x.createLodging = async (body) => {
  return knex.transaction(async trx => {
    
    const { amenities, ...details } = body

    const id = await trx('listing').insert(details)
    await amenity.insertLodgingAmenities(id, amenities)

  })
}

module.exports = x;
