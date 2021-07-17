import 'source-map-support/register';
import './util/env';
import { app } from './server/app';
import { logger } from './util/logger';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}.`);
});
