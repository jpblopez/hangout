const knex = require('@/db/knex');
const amenity = require('v1/components/Amenities/service');

const x = {};

x.getLodgings = async () => {
  const result = await knex.select().table('listing');
  return result;
};

x.getLodging = async id => {
  const result = await knex
    .select('description', 'image', 'location', 'owner', 'rate', 'title')
    .table('listing')
    .where('id', parseInt(id, 10))
    .first();

  return result;
};

x.createLodging = async body =>
  knex.transaction(async trx => {
    const { amenities, ...details } = body;

    const id = await trx('listing').insert(details);
    await amenity.insertLodgingAmenities(id, amenities);
  });

module.exports = x;
