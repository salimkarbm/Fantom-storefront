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
    const result = await store.create(product);
    expect(result).toEqual(product);
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
    const result = await store.index();
    expect(result).toBeInstanceOf(Object);
  });
});
