const app = require('../src/app');
const request = require('supertest');

describe('Logdging', () => {
  const lodge = () => request(app);

  test('should have a get all route', async () => {
    const res = await lodge().get('/v1/lodging');

    expect(Number(res.statusCode)).not.toBe(404);
  });

  test('should return an object containing a lodgings arrays', async () => {
    const res = await lodge().get('/v1/lodging');

    expect(Number(res.statusCode)).toBe(200);
    expect(res.body).toHaveProperty('lodgings');
    expect(Array.isArray(res.body.lodgings)).toBe(true);
  });

  test('should return an object containing the details for an existing lodging', async () => {
    const res = await lodge().get('/v1/lodging/1');

    expect(Number(res.statusCode)).not.toBe(404);
    expect(res.body).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
      rate: expect.any(Number),
      owner: expect.any(Number),
      location: expect.any(String),
      image: expect.any(String),
    });
  });

  test('should return a 404 on invalid lodging', async () => {
    const res = await lodge().get('/v1/lodging/test');

    expect(Number(res.statusCode)).toBe(404);
  });
});
