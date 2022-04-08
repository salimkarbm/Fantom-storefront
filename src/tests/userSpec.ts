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
    await expectAsync(store.create(user)).toBeResolved();
  });
  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return an list of all users', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
  });
  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return a single user', async () => {
    await expectAsync(store.index()).toBeResolved();
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
    expect(result).toBeFalsy();
  });
});
