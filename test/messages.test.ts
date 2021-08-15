import supertest from 'supertest';
import { DbConnection } from '../src/db/connection';
import { MessagesService } from '../src/services/messages';
import { app } from '../src/express/app';

beforeAll(async () => {
  await DbConnection.create();

  const messsageService = new MessagesService();
  await messsageService.save({
    id: 1,
    body: 'Yoooo!',
  });
  return await messsageService.save({
    id: 2,
    body: 'Bye!',
  });
});

afterAll(async () => {
  return await DbConnection.close();
});

describe('GET /messages', () => {
  test('returns all messages', async () => {
    const response = await supertest(app).get('/messages');

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual([
      {
        id: 1,
        body: 'Yoooo!',
      },
      {
        id: 2,
        body: 'Bye!',
      },
    ]);
  });
});
