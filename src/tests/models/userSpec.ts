import { UserStore } from '../../models/users';

const store = new UserStore();

describe('Test Users', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have an updateMe method', () => {
    expect(store.updateMe).toBeDefined();
  });
  it('should have a destroy method', () => {
    expect(store.destroy).toBeDefined();
  });
});
