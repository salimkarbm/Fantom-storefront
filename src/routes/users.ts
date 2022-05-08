import express from 'express';
import verifyAuthToken from '../middlewares/authentication';
import authenticate from './authentication';

import { create, index, show, updateMe, destroy } from '../handlers/users';

const userRoutes = (app: express.Application) => {
  app.post('/api/users', create);
  app.get('/api/users', verifyAuthToken, index);
  app.get('/api/users/:id', verifyAuthToken, show);
  app.post('/api/login', authenticate);
  app.patch('/api/users/:id', verifyAuthToken, updateMe);
  app.delete('/api/users/:id', verifyAuthToken, destroy);
};

export default userRoutes;
