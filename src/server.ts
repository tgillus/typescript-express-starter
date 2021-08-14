import 'source-map-support/register';
import './util/env';
import { app } from './express/app';
import { logger } from './util/logger';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}.`);
});
