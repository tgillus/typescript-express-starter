import './util/env';
import 'reflect-metadata';
import { DbConnection } from './db/connection';
import { app } from './express/app';
import { logger } from './util/logger';
import { Message } from './entities/message';

async function main() {
  const port = process.env.PORT;

  app.listen(port, () => {
    logger.info(`listening on port ${port}.`);
  });

  const connection = await DbConnection.create();
  const message = connection.manager.create(Message, {
    body: 'Hello TypeORM!',
  });

  await connection.manager.save(message);
}

main().catch((error) => {
  logger.error(error.message);
});
