import { Request, Response } from 'express';
import { MessagesService } from '../services/messages';
import { logger } from '../util/logger';

export async function all(request: Request, response: Response): Promise<void> {
  const messagesService = new MessagesService();

  try {
    const messages = await messagesService.all();

    response.status(200).json(messages);
  } catch (error) {
    logger.error(error.message);

    response.status(500).json({ error: 'Failed to retrieve messages' });
  }
}
