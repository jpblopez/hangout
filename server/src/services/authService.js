const knex = require('../db/knex');

const x = {};

x.getUsers = async email => {
  let result = await knex.select().table('user').where('email', email).first();
  return result;
};

x.insertUsers = async (username, email, name, password) => {
  await knex('user').insert({
    username: username,
    email: email,
    name: name,
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
