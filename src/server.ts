import express, { Request, Response } from 'express';

import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import { authRoutes } from './handlers/authentication';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express();
const address = '0.0.0.0:3000';
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send(
    'Welcome to Fantom. The following endpoint are available to be accessed: /products, /users, /orders.'
  );
});

authRoutes(app);
userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.get('*', (req: Request, res: Response) => {
  res.status(200).json({ Message: 'Please provide a valid endpoint' });
});

app.listen(PORT, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
