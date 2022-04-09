import client from '../database';

export interface Order {
  id?: string;
  status: string;
  userId: string;
}

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const values = [order.status, order.userId];
      const conn = await client.connect();
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`could not create order ${err}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to fetch orders from database ${err}`);
    }
  }
}
