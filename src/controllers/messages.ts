import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Message } from '../db/entities/message';

export class MessagesController {
  async all(request: Request, response: Response): Promise<void> {
    const messageRepository = getRepository(Message);
    const messages = await messageRepository.find();

    response.json(messages).status(200);
  }
}
