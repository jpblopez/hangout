const knex = require('../db/knex');

const x = {};

x.getAll = async () => {
  return knex('amenities').select();
};

x.insertLodgingAmenities = async (lodgingID, amenities) => {
  const insert = amenities.map(item => ({ lodging_id: lodgingID, amenity_id: item }));
  knex('listing_amenities').insert(insert);
};

module.exports = x;
