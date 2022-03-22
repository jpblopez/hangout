require('dotenv').config();

const config = {
  port: process.env.PORT,
  secret: 'access',
  secret2: 'refresh',
};

module.exports = config;
