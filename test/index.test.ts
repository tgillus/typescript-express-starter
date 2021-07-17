import supertest from 'supertest';
import { app } from '../src/server/server';

describe('GET /', () => {
  it('returns a JSON with a message', (done) => {
    const expectedBody = {
      message: 'Hello Express!',
    };

    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, expectedBody, done);
  });
});
