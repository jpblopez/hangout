const app = require('../src/app');
const request = require('supertest');

// todo testing for auth routes

describe('General testing', () => {
  test('server should be running', done => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);

        console.log(res.headers);
        return done();
      });
  });
});
