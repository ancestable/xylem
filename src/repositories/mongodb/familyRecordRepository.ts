import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { FamilyRecordFormatter } from '../../models';
import { IFamilyRecordModel } from '@ancestable/shared';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';
import { Tag } from '@ancestable/gedcom7models';

@provideSingleton(FamilyRecordRepository)
export class FamilyRecordRepository extends BaseRepository<IFamilyRecordModel> {
  protected modelName: string = 'familyRecords';
  protected schema: Schema = new Schema({
    parentDatasetId: { type: String, required: true },
    referenceId: { type: String, required: false },
    [Tag.Restriction]: { type: [Schema.Types.Mixed], required: false },
    [Tag.Husband]: { type: Schema.Types.Mixed, required: false },
    [Tag.Wife]: { type: Schema.Types.Mixed, required: false },
    [Tag.Child]: { type: [Schema.Types.Mixed], required: false },
    familyAttributeStructures: { type: [Schema.Types.Mixed], required: false },
    familyEventStructures: { type: [Schema.Types.Mixed], required: false },
    nonEventStructures: { type: [Schema.Types.Mixed], required: false },
    associationStructures: { type: [Schema.Types.Mixed], required: false },
    [Tag.Submitter]: { type: [Schema.Types.Mixed], required: false },
    noteStructures: { type: [Schema.Types.Mixed], required: false },
    sourceCitations: { type: [Schema.Types.Mixed], required: false },
    multimediaLinks: { type: [Schema.Types.Mixed], required: false },
    changeDate: { type: Schema.Types.Mixed, required: false },
    creationDate: { type: Schema.Types.Mixed, required: false },
  });
  protected formatter = FamilyRecordFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
