const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./router/auth.js');
const lodgingRouter = require('./router/lodging');
const knex = require('../src/db/knex');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/v1/auth', authRouter);
app.use('/v1/lodging', lodgingRouter);

module.exports = app;
