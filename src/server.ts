import express, { Request, Response } from 'express';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(express.json());

app.get('/', async function (req: Request, res: Response) {
    res.send('Welcome to Fantom');
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
