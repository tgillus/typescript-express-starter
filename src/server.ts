import './util/env';
import { app } from './express/app';
import { logger } from './util/logger';
import knex from 'knex';

knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true,
});
// knex({
//   client: 'sqlite3',
//   connection: {
//     filename: 'file:memDb1?mode=memory',
//   },
//   useNullAsDefault: true,
// });
// interface User {
//   id: number;
//   name: string;
//   age: number;
// }

// knex<User>('users').where('id').first();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}.`);
});
