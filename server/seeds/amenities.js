/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('amenities').del()
  await knex('amenities').insert([
    {id: 1, name: 'Wifi'},
    {id: 2, name: 'Private bathroom'},
    {id: 3, name: 'Kitchen'},
    {id: 4, name: 'Air conditioning'},
    {id: 5, name: 'TV'},
    {id: 6, name: 'Free parking'},
    {id: 7, name: 'Washer'}
  ]);
};
