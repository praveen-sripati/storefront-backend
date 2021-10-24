// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  userId?: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get orders: ${error}`);
    }
  }

  async show(id: number): Promise<Order | null> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows[0]) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(`Unable fetch the order with the given id-${id}: ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order: ${error}`);
    }
  }

  async delete(id: number): Promise<Order | null> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const deletedOrder = result.rows[0];
      conn.release();
      if (deletedOrder) {
        return deletedOrder;
      }
      return null;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
    // get order to see if it is active
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [orderId]);
      const order = result.rows[0];
      if (result.rows.length) {
        if (order.status !== 'active') {
          throw new Error(
            `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`,
          );
        }
      }
      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
    }
  }
}
