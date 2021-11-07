import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { ISubmitterRecordModel } from '@ancestable/shared';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';
import { SubmitterRecordFormatter } from '../../models';
import { Tag } from '@ancestable/gedcom7models';

@provideSingleton(SubmitterRecordRepository)
export class SubmitterRecordRepository extends BaseRepository<ISubmitterRecordModel> {
  protected modelName: string = 'sourceRecords';
  protected schema: Schema = new Schema({
    parentDatasetId: { type: String, required: true },
    referenceId: { type: String, required: false },
    addressStructure: { type: [Schema.Types.Mixed], required: false },
    [Tag.Phone]: { type: [String], required: false },
    [Tag.Email]: { type: [String], required: false },
    [Tag.Fax]: { type: [String], required: false },
    [Tag.Web]: { type: [String], required: false },
    multiMediaLinks: { type: [Schema.Types.Mixed], required: false },
    [Tag.Language]: { type: [String], required: false },
    identifierStructures: { type: [Schema.Types.Mixed], required: false },
    noteStructures: { type: [Schema.Types.Mixed], required: false },
    changeDate: { type: Schema.Types.Mixed, required: false },
    creationDate: { type: Schema.Types.Mixed, required: false },
  });
  protected formatter = SubmitterRecordFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
