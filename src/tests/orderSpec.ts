//import { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';

const store = new OrderStore();

const order: Order = {
  id: '1',
  status: 'pending',
  userId: '15',
};

describe('Test products', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should return created order', async () => {
    await expectAsync(store.create(order)).toBeResolved();
  });
  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return list of orders', async () => {
    await expectAsync(store.index()).toBeResolved();
  });
  // xit('should have a show method', () => {
  //   expect(store.show()).toBeDefined();
  // });
  // xit('should return a single item', async () => {
  //   await expectAsync(store.show()).toBeResolved();
  // });
});
