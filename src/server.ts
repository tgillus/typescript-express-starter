import './util/env';
import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { app } from './express/app';
import { logger } from './util/logger';
import { Message } from './db/entities/message';

// throw new Error('error');

const options: ConnectionOptions = {
  type: 'sqljs',
  entities: [Message],
  synchronize: true,
  logging: false,
};

async function main() {
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    logger.info(`listening on port ${PORT}.`);
  });

  const connection = await createConnection(options);
  const message = connection.manager.create(Message, {
    body: 'Hello TypeORM!',
  });
  await connection.manager.save(message);
}

main().catch((error) => {
  logger.error(error.message);
});
