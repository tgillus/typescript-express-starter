import supertest from 'supertest';
import { app } from '../src/express/app';

describe('GET /', () => {
  it('returns a JSON with a message', (done) => {
    const expectedBody = {
      message: 'Hello Express!',
    };

    supertest(app)
      .get('/messages')
      .expect('Content-Type', /json/)
      .expect(200, expectedBody, done);
  });
});
