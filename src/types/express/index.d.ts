import { User } from '../../models/users';

declare global {
  declare namespace Express {
    interface Request {
      user: User;
    }
  }
}
