require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  secret: 'secreeeeeet',
};

module.exports = config;
