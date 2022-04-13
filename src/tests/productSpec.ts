import { Product, ProductStore } from '../models/products';

const store = new ProductStore();

describe('Test products', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should return created product', async () => {
    await expectAsync(store.create(product)).toBeResolved();
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return list of all product', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should return a single product', async () => {
    await expectAsync(store.show()).toBeResolved();
  });
  it('should have a productByCategory method', () => {
    expect(store.productByCategory).toBeDefined();
  });
  it('should return all product that belong to the same category', async () => {
    await expectAsync(store.destroy()).toBeResolved();
  });
});
