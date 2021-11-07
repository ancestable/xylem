import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { IRepositoryRecordModel } from '@ancestable/shared';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { RepositoryRecordFormatter } from '../../models';
import { Schema } from 'mongoose';
import { Tag } from '@ancestable/gedcom7models';

@provideSingleton(RepositoryRecordRepository)
export class RepositoryRecordRepository extends BaseRepository<IRepositoryRecordModel> {
  protected modelName: string = 'repositoryRecords';
  protected schema: Schema = new Schema({
    parentDatasetId: { type: String, required: true },
    referenceId: { type: String, required: false },
    [Tag.Name]: { type: [String], required: false },
    addressStructure: { type: Schema.Types.Mixed, required: false },
    [Tag.Phone]: { type: [String], required: false },
    [Tag.Email]: { type: [String], required: false },
    [Tag.Fax]: { type: [String], required: false },
    [Tag.Web]: { type: [String], required: false },
    identifierStructures: { type: [Schema.Types.Mixed], required: false },
    noteStructures: { type: [Schema.Types.Mixed], required: false },
    changeDate: { type: Schema.Types.Mixed, required: false },
    creationDate: { type: Schema.Types.Mixed, required: false },
  });
  protected formatter = RepositoryRecordFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
