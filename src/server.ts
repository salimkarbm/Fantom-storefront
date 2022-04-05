import express, { Request, Response } from 'express';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send(
    'Welcome to Fantom. The following endpoint are available to be accessed: /products, /users, /orders.'
  );
});

app.get('*', (req: Request, res: Response) => {
  res.status(200).json({ Message: 'Please provide a valid endpoint' });
});

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
