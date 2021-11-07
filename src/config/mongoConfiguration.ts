import * as mongoose from 'mongoose';
import { Logger } from '../utils/initialize/logger';
import { MongoMemoryServer } from 'mongodb-memory-server';
import configuration from './configuration';
import { provideSingleton } from '../ioc';

mongoose.set('debug', Logger.loggingEnabled);

@provideSingleton(MongoDbConnection)
export class MongoDbConnection {
  db: mongoose.Connection;

  public async init(): Promise<void> {
    Logger.log(`Connecting to ${configuration.environment} mongodb`);
    const connectionString = await this.getConnectionString();
    this.db = mongoose.createConnection(connectionString);
  }

  private async getConnectionString(): Promise<string> {
    if (configuration.mongodb?.connectionString) {
      return configuration.mongodb.connectionString;
    } else {
      Logger.log('Creating memory database');
      const mongod = await this.createMonogMemoryServer();
      return mongod.getUri();
    }
  }

  private async createMonogMemoryServer(): Promise<MongoMemoryServer> {
    return await MongoMemoryServer.create({
      instance: {
        dbPath: 'var/.data/mongodb',
        dbName: 'ancestable',
        storageEngine: 'wiredTiger',
      },
    });
  }
}
