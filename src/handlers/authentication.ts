import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser, Authservices } from '../services/authentication';

const authstore = new Authservices();

const secret = process.env.TOKEN_SECRET as string;

const authenticate = async (req: Request, res: Response) => {
  const user: AuthUser = {
    password: req.body.password,
    email: req.body.email,
  };
  if (!user.email || !user.password) {
    return res
      .status(400)
      .json({ message: 'please provide valid email and password' });
  }
  try {
    const authenticateUser = await authstore.authenticate(
      user.email,
      user.password
    );
    if (authenticateUser === null) {
      return res.status(401).json({ message: 'incorrect password or email' });
    }
    const token = jwt.sign({ userId: authenticateUser.id }, secret);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export default authenticate;
