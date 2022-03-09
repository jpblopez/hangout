/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('listing', table => {
    table.increments('id');
    table.string('title');
    table.text('description');
    table.float('rate');
    table.integer('owner');
    table.string('location');
    table.string('image');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('listing');
};
