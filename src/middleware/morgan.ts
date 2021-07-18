import morgan from 'morgan';
import { logger } from '../util/logger';

const stream: morgan.StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(':method :url :status :response-time ms', {
  stream,
  skip,
});

export { morganMiddleware };
