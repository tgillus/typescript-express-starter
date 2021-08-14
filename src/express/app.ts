import express from 'express';
import { morganMiddleware } from '../middlewares/morgan';
import { messagesRouter } from '../routes/messages';

const app = express();

app.use(morganMiddleware);
app.use('/messages', messagesRouter);

export { app };
