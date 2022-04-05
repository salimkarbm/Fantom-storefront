import client from '../database';

describe('Database Test', () => {
  it('it expects database to be connected', async (): Promise<void> => {
    const response = await client.connect();
    console.log(response);
  });
});
