import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { ISharedNoteRecordModel } from '@ancestable/shared';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';
import { SharedNoteRecordFormatter } from '../../models';
import { Tag } from '@ancestable/gedcom7models';

@provideSingleton(SharedNoteRecordRepository)
export class SharedNoteRecordRepository extends BaseRepository<ISharedNoteRecordModel> {
  protected modelName: string = 'sharedNoteRecords';
  protected schema: Schema = new Schema({
    parentDatasetId: { type: String, required: true },
    referenceId: { type: String, required: false },
    value: { type: String, required: false },
    [Tag.Mime]: { type: Schema.Types.Mixed, required: false },
    [Tag.Language]: { type: String, required: false },
    [Tag.Translation]: { type: [Schema.Types.Mixed], required: false },
    [Tag.Fax]: { type: [String], required: false },
    [Tag.Web]: { type: [String], required: false },
    sourceCitations: { type: [Schema.Types.Mixed], required: false },
    identifierStructures: { type: [Schema.Types.Mixed], required: false },
    changeDate: { type: Schema.Types.Mixed, required: false },
    creationDate: { type: Schema.Types.Mixed, required: false },
  });
  protected formatter = SharedNoteRecordFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
