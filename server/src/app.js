const express = require('express');
const cors = require('cors');
const v1 = require('v1/index');

const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/v1', v1);

module.exports = app;
