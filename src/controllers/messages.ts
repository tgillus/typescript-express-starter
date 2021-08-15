import { Request, Response } from 'express';
import { MessagesService } from '../services/messages';
import { logger } from '../util/logger';

export async function all(request: Request, response: Response): Promise<void> {
  const messagesService = new MessagesService();

  try {
    const messages = await messagesService.all();

    response.json(messages).status(200);
  } catch (error) {
    logger.error(error.message);

    response.json({ error: 'Failed to retrieve messages' }).status(500);
  }
}
