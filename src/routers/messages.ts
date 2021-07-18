import express from 'express';
import * as messagesController from '../controllers/messages';

export const router = express.Router();

router.get('/', messagesController.getMessage);
