import { ProductStore } from '../models/products';

const store = new ProductStore();

describe('Test products', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a productByCategory method', () => {
    expect(store.productByCategory).toBeDefined();
  });
  it('should have an update method', () => {
    expect(store.update).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.destroy).toBeDefined();
  });
});
