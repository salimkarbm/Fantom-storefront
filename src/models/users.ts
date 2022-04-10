import bcrypt from 'bcrypt';
import client from '../database';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
}
const pepper = process.env.BCRYPT_PASSWORD;
export class UserStore {
  async create(user: User): Promise<User> {
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    };
    const saltRound = parseInt(process.env.SALT_ROUNDS as string, 10);
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING * ';
      const hash = await bcrypt.hash(newUser.password + pepper, saltRound);

      const result = await conn.query(sql, [
        newUser.firstName,
        newUser.lastName,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create user ${newUser.firstName},${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to fetch users from database ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id=${id}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      const book = result.rows[0];
      conn.release();
      return book;
    } catch (err) {
      throw new Error(`unable find user with id ${id}. ${err}`);
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT firstname, lastname, password_digest FROM users WHERE firstname = ($1) AND lastname = ($2)';
      const result = await conn.query(sql, [firstname, lastname]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (await bcrypt.compare(password + pepper, user.password_digest)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Unable to authenticate user ${err}`);
    }
  }
}
