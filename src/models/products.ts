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

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to fetch products from database ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE id=${id}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`unable to find products with id ${id}. Error: ${err}`);
    }
  }

  async productByCategory(category: string): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM products WHERE category='${category}'`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(`${category} does not exist.${err}`);
    }
  }
}
