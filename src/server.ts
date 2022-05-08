import express, { Request, Response } from 'express';

import userRoutes from './routes/users';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import authRoutes from './routes/authentication';
import dashboardRoutes from './routes/dashboard';

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

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    Message: `can't find ${req.originalUrl} on the server`,
  });
});

app.listen(PORT, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
