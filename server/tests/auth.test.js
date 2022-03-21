const app = require('../src/app');
const request = require('supertest');
const jwt = require('jsonwebtoken');

require('dotenv').config();

describe('Login', () => {
  const login = () => request(app).post('/v1/auth/login');

  test('should exist', () => {
    return login()
      .send({})
      .expect(res => {
        expect(Number(res.status)).not.toBe(404);
      });
  });

  test('should return 422 on validation error', () => {
    return login()
      .send({
        email: 'test',
        password: 'test',
      })
      .expect(res => {
        expect(Number(res.status)).toBe(422);
      });
  });

  test('should not return 422 on valid body', () => {
    return login()
      .send({
        email: 'jp@gmail.com',
        password: 'thisismypassword',
      })
      .expect(res => {
        expect(Number(res.status)).not.toBe(422);
      });
  });
});

describe('Registration', () => {
  const register = () => request(app).post('/v1/auth/register');

  test('should exist', () => {
    return register()
      .send({})
      .expect(res => {
        expect(Number(res.status)).not.toBe(404);
      });
  });

  test('should accept valid body', () => {
    return register()
      .send({
        name: 'jp',
        email: 'jp@gmail.com',
        password: 'test',
      })
      .expect(res => {
        expect(Number(res.status)).not.toBe(422);
      });
  });

  test('should return 422 on invalid body', () => {
    return register()
      .send({
        name: 'jp',
        email: 'jp@',
        password: 'test',
      })
      .expect(res => {
        expect(Number(res.status)).toBe(422);
      });
  });
});

describe('Refresh token', () => {
  const token = () => request(app).get('/v1/auth/token/refresh');

  test('should exist', async () => {
    const res = await token();

    expect(Number(res.status)).not.toBe(404);
  });

  test('should return 400 on request without X-Refresh-Token header', async () => {
    const res = await token();
    expect(Number(res.status)).toBe(401);
  });

  test('should return 422 on invalid token', async () => {
    const refresh = 'something';

    const res = await token().set('X-Refresh-Token', refresh);

    expect(Number(res.status)).toBe(401);
  });
});
