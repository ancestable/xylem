import { IMultimediaRecordModel, MultimediaRecordFormatter } from '../../models';
import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';
import { Tag } from '@ancestable/gedcom7models';

@provideSingleton(MultimediaRecordRepository)
export class MultimediaRecordRepository extends BaseRepository<IMultimediaRecordModel> {
  protected modelName: string = 'multimediaRecords';
  protected schema: Schema = new Schema({
    parentDatasetId: { type: String, required: true },
    referenceId: { type: String, required: false },
    [Tag.Restriction]: { type: [Schema.Types.Mixed], required: false },
    [Tag.File]: { type: [Schema.Types.Mixed], required: false },
    identifierStructures: { type: [Schema.Types.Mixed], required: false },
    noteStructures: { type: [Schema.Types.Mixed], required: false },
    sourceCitations: { type: [Schema.Types.Mixed], required: false },
    changeDate: { type: Schema.Types.Mixed, required: false },
    creationDate: { type: Schema.Types.Mixed, required: false },
  });
  protected formatter = MultimediaRecordFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
