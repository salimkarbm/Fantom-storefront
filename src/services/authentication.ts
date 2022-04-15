import bcrypt from 'bcrypt';
import client from '../database';
import { User } from '../models/users';

export interface AuthUser {
  email: string;
  password: string;
}

export const pepper = process.env.BCRYPT_PASSWORD;

export class Authservices {
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT id, email, password_digest FROM users WHERE email='${email}'`;
      const result = await conn.query(sql);
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
