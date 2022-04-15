import { User, UserStore } from '../models/users';

const store = new UserStore();

fdescribe('Test Users', () => {
  const user: User = {
    firstName: 'michael',
    lastName: 'jordan',
    email: 'jordan@gmail.com',
    password: 'password',
  };
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should return created user', async () => {
    expectAsync(store.create(user)).toBeResolved();
  });
  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return a list of all users', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toEqual(0);
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should return a single user', async () => {
    await expectAsync(store.show('1')).toBeResolved();
  });
  // it('should have an authenticate method', () => {
  //   expect(store.authenticate).toBeDefined();
  // });
  // it('should return token', async () => {
  //   const result = await store.authenticate(user.email, user.password);
  //   expect(result).toBeFalsy();
  // });
  it('should have an updateMe method', () => {
    expect(store.updateMe).toBeDefined();
  });
  // it('should return updated user', () => {
  //   expectAsync(
  //     store.updateMe('1', user.firstname, user.lastname, user.email)
  //   ).toBeResolved();
  // });
  it('should have a destroy method', () => {
    expect(store.destroy).toBeDefined();
  });
  it('should have a destroy method', () => {
    expectAsync(store.destroy('1')).toBeResolved();
  });
});
