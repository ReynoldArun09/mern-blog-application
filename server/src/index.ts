import { app } from './app';
import MongoConnection from './database/MongoConnection';
import { logger } from './utils/logger';

const port = process.env.PORT || 3001;
const nodeEnv = process.env.NODE_ENV;

MongoConnection();

app.listen(port, () => {
  console.log(
    `[${nodeEnv?.toUpperCase()} Server is up and running on http://localhost:${port}]`,
  );
});


process.on('uncaughtException', (err: Error) => {
  logger.error(`${err.message}`);
  logger.error('Shutting down server to handle uncaughtException error.');
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  logger.error(`${err.message}`);
  logger.error('Shutting down server to handle unhandledRejection error.');
  process.exit(1);
});
