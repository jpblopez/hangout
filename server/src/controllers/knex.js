const knex = require('../db/knex');

const x = {};

x.getUsers = async email => {
  let result;
  result = await knex.select().table('user').where('email', email).first();
  return result;
};

x.insertUsers = async (email, username, password) => {
  await knex('user').insert({
    email: email,
    name: username,
    password: password,
  });
};

module.exports = x;
