//import supertest from 'supertest';
import { UserStore } from '../models/users';
import { Authservices } from '../services/authentication';
//import app from '../server';

const store = new UserStore();
const auth = new Authservices();

describe('Test Users model', () => {
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
  it('should have a destroy method', () => {
    expect(auth.authenticate).toBeDefined();
  });
});
