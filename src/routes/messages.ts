import express from 'express';
import { MessagesController } from '../controllers/messages';

const messagesRouter = express.Router();

messagesRouter.get('/', new MessagesController().all);

export { messagesRouter };
