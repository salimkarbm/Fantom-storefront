import { User, UserStore } from '../models/users';

const store = new UserStore();
const user: User = {
  firstName: 'john',
  lastName: 'joe',
  password: '1234',
};
describe('Test Users', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should return created user', async () => {
    const result = await store.create(user);
    expect(result).toEqual(user);
  });
  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return an array of all users', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
  });
  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return a single user', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Object);
  });
  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });
  it('should return token', async () => {
    const result = await store.authenticate(
      user.firstName,
      user.lastName,
      user.password
    );
    expect(result).toBeInstanceOf(String);
  });
});
