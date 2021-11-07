import { ISourceRecordModel, SourceRecordFormatter } from '../../models';
import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';
import { Tag } from '@ancestable/gedcom7models';

@provideSingleton(SourceRecordRepository)
export class SourceRecordRepository extends BaseRepository<ISourceRecordModel> {
  protected modelName: string = 'sourceRecords';
  protected schema: Schema = new Schema({
    parentDatasetId: { type: String, required: true },
    referenceId: { type: String, required: false },
    [Tag.Data]: { type: Schema.Types.Mixed, required: false },
    [Tag.Author]: { type: [String], required: false },
    [Tag.Abbreviation]: { type: [String], required: false },
    [Tag.Publication]: { type: [String], required: false },
    [Tag.Text]: { type: [Schema.Types.Mixed], required: false },
    sourceRepositoryCitation: { type: [Schema.Types.Mixed], required: false },
    identifierStructures: { type: [Schema.Types.Mixed], required: false },
    noteStructures: { type: [Schema.Types.Mixed], required: false },
    multiMediaLinks: { type: [Schema.Types.Mixed], required: false },
    changeDate: { type: Schema.Types.Mixed, required: false },
    creationDate: { type: Schema.Types.Mixed, required: false },
  });
  protected formatter = SourceRecordFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
