// @ts-ignore
import Client from '../database';

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{ name: string; price: number; order_id: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  // Get all users that have made orders
  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  // Get all completed orders of a user
  async completedOrders(userId: number): Promise<{ id: string; status: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT id, status FROM orders WHERE user_id=($1) AND status='open'";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  // Get current order of user
  async activeOrder(userId: number): Promise<{ id: string; status: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT id, status FROM orders WHERE user_id=($1) AND status='active'";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get user with current order: ${err}`);
    }
  }

  // Get five most expensive products
  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }
}
