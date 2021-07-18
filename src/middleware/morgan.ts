import morgan from 'morgan';
import { logger } from '../util/logger';

const stream: morgan.StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = () => {
  return process.env.NODE_ENV !== 'development';
};

const options = {
  stream,
  skip,
};

export const morganMiddleware = morgan(
  ':method :url :status :response-time ms',
  options
);
