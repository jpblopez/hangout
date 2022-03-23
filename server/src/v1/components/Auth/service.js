import knex from '@/db/knex';

const x = {};

x.getUsers = async email => {
  const result = await knex.select().table('user').where('email', email).first();
  return result;
};

x.insertUsers = async (username, email, name, password) => {
  await knex('user').insert({
    username,
    email,
    name,
    password,
  });
};

x.updateToken = async (id, token) => {
  await knex('user').where('id', id).update({ token });
};

x.getToken = async token => {
  const result = await knex.select().table('user').where('token', token).first();
  return result;
};

export default x;
