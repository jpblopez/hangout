const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./router/auth.js');
const lodgingRouter = require('./router/lodging');
const knex = require('../src/db/knex');
const createError = require('http-errors');

app.use(cors());
app.use(express.json());

app.use('/v1/auth', authRouter);
app.use('/v1', lodgingRouter);
app.get('/', (req, res) => res.sendStatus(200));

module.exports = app;
