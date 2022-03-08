/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('listing', table => {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.string('location');
    table.string('rate');
    table.string('owner');
    table.text('image');
    table.string('Amenities');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('listing');
};
