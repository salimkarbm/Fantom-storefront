import client from '../database';

describe('Database Test', () => {
  it('it expects database to be connected', async (): Promise<void> => {
    await client.connect();
  });
});
