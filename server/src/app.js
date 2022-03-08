const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./router/auth.js');
const knex = require('../src/db/knex');

app.use(cors());
app.use(express.json());

app.use('/v1/auth', authRouter);

app.get('/', (req, res) => res.sendStatus(200));

app.get('/v1/lodging', async (req, res) => {
  result = await knex
    .select('id', 'title', 'location', 'rate', 'image')
    .table('listing');
  res.status(200).json({
    result,
  });
});

app.get('/v1/lodging/:id', async (req, res) => {
  try {
    result = await knex
      .select()
      .table('listing')
      .where('id', parseInt(req.params.id))
      .first();
  } catch {}
  res.status(200).json({
    result,
  });
});

module.exports = app;
