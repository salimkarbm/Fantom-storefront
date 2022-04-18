import client from '../database';

class DashboardQueries {
  async popularProducts(): Promise<string[]> {
    try {
      const sql =
        'SELECT product_id, sum(quantity) FROM order_products GROUP BY ROLLUP(product_id) ORDER BY sum(quantity) DESC LIMIT 5;';
      const conn = await client.connect();

      const filtered = (await conn.query(sql)).rows.filter((item) => {
        if (item.product_id !== null) {
          return item;
        }
        return false;
      });
      conn.release();
      return filtered;
    } catch (err) {
      throw new Error(`Something went wrong!`);
    }
  }
}

export default DashboardQueries;
