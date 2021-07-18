import express from 'express';
import { morganMiddleware } from '../middleware/morgan';
import { router as messagesRouter } from '../routers/messages';

const app = express();

app.use(morganMiddleware);
app.use('/messages', messagesRouter);

export { app };
