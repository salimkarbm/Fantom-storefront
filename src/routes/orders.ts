import express from 'express';
import verifyAuthToken from '../middlewares/authentication';
import {
  create,
  index,
  show,
  completeOrders,
  addProduct,
  showUserOrders,
  currentOrders,
  destroy,
} from '../handlers/orders';

const orderRoutes = (app: express.Application) => {
  app.post('/api/orders', verifyAuthToken, create);
  app.get('/api/orders', verifyAuthToken, index); //show all orders
  app.get('/api/orders/:id', verifyAuthToken, show); //show a single order
  app.get('/api/users/:id/orders', verifyAuthToken, showUserOrders); //show current orders by user (id)
  app.delete('/api/orders/:id', verifyAuthToken, destroy);
  app.get('/api/users/:id/current-orders', verifyAuthToken, currentOrders);
  app.get('/api/users/:id/complete-orders', verifyAuthToken, completeOrders);
  app.post('/api/orders/:id/product/:id', verifyAuthToken, addProduct);
};

export default orderRoutes;
