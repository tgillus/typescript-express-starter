import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection,
} from 'typeorm';
import { Message } from '../entities/message';

export const DbConnection = {
  async create(): Promise<Connection> {
    const options: ConnectionOptions = {
      type: 'sqljs',
      entities: [Message],
      synchronize: true,
      logging: false,
    };

    return await createConnection(options);
  },

  async close(): Promise<void> {
    return await getConnection().close();
  },
};
