import express from 'express';
import { morganMiddleware } from '../middleware/morgan';

const app = express();

app.use(morganMiddleware);

app.get('/', (req, res) => {
  const body = {
    message: 'Hello Express!',
  };

  res.json(body).status(200);
});

export { app };
