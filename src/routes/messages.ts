import express from 'express';
import * as messagesController from '../controllers/messages';

const messagesRouter = express.Router();

messagesRouter.get('/', messagesController.all);

export { messagesRouter };
