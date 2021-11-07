import { Configuration } from '../models/configuration';
import { config } from 'dotenv';
import { resolve as pathResolve } from 'path';

const DEFAULT_ENVIRONMENT = 'development';
const { env } = process;
config({ path: pathResolve(__dirname, `./env/.env.${env.NODE_ENV || DEFAULT_ENVIRONMENT}`) });

export default {
  environment: env.NODE_ENV || DEFAULT_ENVIRONMENT,
  port: Number(env.PORT || 3001),
  loggingEnabled: Boolean(env.LOGGING_ENABLED),
  mongoConnectionString: env.MONGO_CONNECTION_STRING,
  encryptionSalt: env.ENCRYPTION_SALT,
  jwtSecret: env.JWT_SECRET,
  tokenExpireDuration: env.TOKEN_EXPIRE_DURATION,
} as Configuration;