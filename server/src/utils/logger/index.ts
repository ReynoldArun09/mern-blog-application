import { createLogger } from "winston"
import LokiTransport from "winston-loki";

const options = {
  transports: [
    new LokiTransport({
      host: process.env.LOKI_HOST!
    })
  ]
};
export const logger = createLogger(options);