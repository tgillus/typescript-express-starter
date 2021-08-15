import { getRepository } from 'typeorm';
import { Message } from '../entities/message';

export class MessagesService {
  private messageRepository = getRepository(Message);

  all(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async save(message: Message): Promise<Message[]> {
    return this.messageRepository.save([message]);
  }
}
