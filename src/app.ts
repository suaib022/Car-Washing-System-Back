import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/Routes';
const app: Application = express();
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', router);

const test = (req: Request, res: Response) => {
  res.send('Hello People !');
};

app.get('/', test);

export default app;
