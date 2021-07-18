import express from 'express';
import * as messagesController from '../controllers/messages';

const router = express.Router();

router.get('/', messagesController.getMessage);

export { router };
