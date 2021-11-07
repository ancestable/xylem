import { DatasetFormatter, IDatasetModel } from '../../models/datasetModel';
import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';

@provideSingleton(DatasetRepository)
export class DatasetRepository extends BaseRepository<IDatasetModel> {
  protected modelName: string = 'dataset';
  protected schema: Schema = new Schema({
    users: { type: Schema.Types.Mixed, required: false },
    name: { type: String, required: true },
  });
  protected formatter = DatasetFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
