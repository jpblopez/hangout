const knex = require('../db/knex');

const x = {};

x.getLodgings = async () => {
  let result;
  result = await knex.select().table('listing');
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

module.exports = x;
