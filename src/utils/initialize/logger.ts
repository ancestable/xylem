import * as logger from 'winston';
import configuration from '../../config/configuration';

const date = new Date();
const fileName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`;

logger.configure({
  level: 'debug',
  format: logger.format.combine(
    logger.format.errors({ stack: true }),
    logger.format.colorize(),
    logger.format.simple()),
  transports: [
    new logger.transports.File({ filename: `logs/${fileName}`, level: 'debug' }),
    new logger.transports.Console(),
  ],
});

export class Logger {
  static readonly loggingEnabled: boolean = configuration.loggingEnabled;
  static readonly console = logger;

  static error(message: any): void {
    if (Logger.loggingEnabled) Logger.console.error(message);
  }

  static info(message: any): void {
    if (Logger.loggingEnabled) Logger.console.info(message);
  }

  static log(message: any): void {
    if (Logger.loggingEnabled) Logger.console.debug(message);
  }

  static verbose(message: any): void {
    if (Logger.loggingEnabled) Logger.console.verbose(message);
  }

  static warn(message: any): void {
    if (Logger.loggingEnabled) Logger.console.warn(message);
  }
}
