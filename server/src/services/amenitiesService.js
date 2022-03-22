const knex = require('../db/knex');

const x = {};

x.getAll = async () => {
  return knex('amenities').select();
};

x.getSpecific = async lodgingId => {
  return await knex('listing_amenities')
    .select('amenity_id')
    .where('lodging_id', lodgingId);
};

x.insertLodgingAmenities = async (lodgingID, amenities) => {
  const insert = amenities.map(item => ({
    lodging_id: lodgingID,
    amenity_id: item,
  }));
  await knex('listing_amenities').insert(insert);
};

module.exports = x;
