const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./router/auth.js');

app.use(cors());
app.use(express.json());

app.use('/v1/auth', authRouter);

app.get('/', (req, res) => res.sendStatus(200));

app.get('/v1/lodging', (req, res) => {});

module.exports = app;
