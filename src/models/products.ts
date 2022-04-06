import client from '../database';

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1,$2, $3) RETURNING *';
      const values = [product.name, product.price, product.category];
      const conn = await client.connect();
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create product ${err}`);
    }
  }
}
