import '../../controllers';

import * as express from 'express';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import { buildProvider, iocContainer } from '../../ioc';
import { ErrorHandler } from '../helper/errorHandler';
import { Logger } from './logger';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { RegisterRoutes } from '../../../build/routes';
import configuration from '../../config/configuration';

export class Server {
  app: express.Express = express();
  private readonly port: number = configuration.port;

  constructor() {
 
    Logger.info(`Using environment: ${configuration.environment}`);

    this.app.use(this.allowCors);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('dev', { skip: () => !Logger.loggingEnabled }));
    this.app.use(ErrorHandler.handleError);
    
    RegisterRoutes(this.app);

    buildProvider();

    this.initMongoDb();

    const swaggerDocument = require('../../../../build/swagger/swagger.json');

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  async listen(port: number = this.port) {
    process.on('uncaughtException', this.criticalErrorHandler);
    process.on('unhandledRejection', this.criticalErrorHandler);
    const listen = this.app.listen(port);
    Logger.info(`Server is running on port: ${port}`);
    return listen;
  }

  private initMongoDb() {
    const mongodb = iocContainer.get<MongoDbConnection>(MongoDbConnection);
    mongodb.init();
  }

  private criticalErrorHandler(error?: any) {
    Logger.error('A critical error occured.');
    if (error) {
      Logger.error(error);
    }
    process.exit(1);
  }

  private allowCors(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token',
    );
    next();
  }
}