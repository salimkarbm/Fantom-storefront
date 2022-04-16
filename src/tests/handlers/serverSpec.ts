import supertest from 'supertest';

import app from '../../server';

describe('Test serve', () => {
  it('it expects server to be running and return a status code of 200', async (): Promise<void> => {
    const request = supertest(app);
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });
});
