import { Authservices } from '../../services/authentication';

const store = new Authservices();

describe('Test Authentication', () => {
  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });
});
