import express from 'express';
import authenticate from '../handlers/authentication';

const authRoutes = (app: express.Application) => {
  app.post('/api/login', authenticate);
};

export default authRoutes;
