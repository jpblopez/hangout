const knex = require('../db/knex');

const x = {};

x.getUsers = async email => {
  let result = await knex.select().table('user').where('email', email).first();
  return result;
};

x.insertUsers = async (email, username, password) => {
  await knex('user').insert({
    email: email,
    name: username,
    password: password,
  });
};

x.updateToken = async (id, token) => {
  await knex('user').where('id', id).update({ token: token });
};

x.getToken = async token => {
  let result = await knex.select().table('user').where('token', token).first();
  return result;
};

module.exports = x;
