const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./router/auth.js');
const lodgingRouter = require('./router/lodging');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const v2Router = require('./router/v2');

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1/auth', authRouter);
app.use('/v1/lodging', lodgingRouter);

app.use('/v2', v2Router);

module.exports = app;
