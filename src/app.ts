import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/Routes';
import globalErrorHandler from './app/Middlewares/globalErrorHandler';
import notFound from './app/Middlewares/notFound';
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api', router);

const test = (req: Request, res: Response) => {
  res.send('Hello People !');
};

app.get('/', test);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
