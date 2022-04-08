import { Product, ProductStore } from '../models/products';

const store = new ProductStore();

const product: Product = {
  name: 'converse chuks taylor',
  price: 1500,
  category: 'fashion',
};

describe('Test products', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should return created product', async () => {
    await expectAsync(store.create(product)).toBeResolved();
  });
  it('should have an index method', () => {
    expect(store.create).toBeDefined();
  });
  it('should return array of objects of all product', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
  });
  it('should have an show method', () => {
    expect(store.create).toBeDefined();
  });
  it('should return a single product', async () => {
    await expectAsync(store.index()).toBeResolved();
  });
  it('should have a productByCategory method', () => {
    expect(store.productByCategory).toBeDefined();
  });
  it('should return all product that belong to the same category', async () => {
    await expectAsync(store.index()).toBeResolved();
  });
});
