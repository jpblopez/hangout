import knex from '@/db/knex';

const x = {};

x.getAll = async () => knex('amenities').select();

x.getSpecific = async lodgingId =>
  knex('listing_amenities').select('amenity_id').where('lodging_id', lodgingId);

x.insertLodgingAmenities = async (lodgingID, amenities) => {
  const insert = amenities.map(item => ({
    lodging_id: lodgingID,
    amenity_id: item,
  }));
  await knex('listing_amenities').insert(insert);
};

export default x;
