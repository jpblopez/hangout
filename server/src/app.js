const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => res.sendStatus(200));

console.log('test');

module.exports = app;
