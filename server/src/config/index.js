require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  secret: 'access',
  secret2: 'refresh',
};

module.exports = config;
