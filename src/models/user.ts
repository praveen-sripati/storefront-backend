// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
};

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users: ${error}`);
    }
  }

  async show(username: string): Promise<User | null> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE user_name=($1)';
      const result = await conn.query(sql, [username]);
      conn.release();
      if (result.rows[0]) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(`Cannot get user with username-${username}: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, user_name, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
      const result = await conn.query(sql, [user.firstName, user.lastName, user.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user: ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE user_name=($1)';
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }

  async delete(id: number): Promise<User | null> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const deletedUser = result.rows[0];
      conn.release();
      if (deletedUser) {
        return deletedUser;
      }
      return null;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
