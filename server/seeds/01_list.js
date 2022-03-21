/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('listing').del();
  await knex('listing').insert([
    {
      id: 1,
      title: 'Summer Escapade',
      location: 'Moalboal',
      description: 'party2',
      rate: 3000,
      owner: 1,
      image: 'summer.jpg',
    },
    {
      id: 2,
      title: 'Summer Escapade',
      location: 'Moalboal',
      description: 'party2',
      rate: 3000,
      owner: 1,
      image: 'summer.jpg',
    },
    {
      id: 3,
      title: 'Summer Escapade',
      location: 'Moalboal',
      description: 'party2',
      rate: 3000,
      owner: 1,
      image: 'summer.jpg',
    },
  ]);
};
