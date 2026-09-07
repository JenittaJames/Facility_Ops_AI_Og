import winston from 'winston';
import { ILogger } from '../../application/interfaces/ILogger';

export class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });
  }

  info(message: string, meta?: unknown): void {
    this.logger.info(message, meta);
  }

  error(message: string, trace?: unknown): void {
    this.logger.error(message, trace);
  }

  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: unknown): void {
    this.logger.debug(message, meta);
  }
}