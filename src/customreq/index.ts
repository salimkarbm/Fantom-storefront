import { Request } from 'express';
import { User } from '../models/users';

export interface customRequest extends Request {
  user?: User;
}
