import { IIndividualRecordModel, IndividualRecordFormatter } from '../../models';
import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';
import { Tag } from '@ancestable/gedcom7models';

@provideSingleton(IndividualRecordRepository)
export class IndividualRecordRepository extends BaseRepository<IIndividualRecordModel> {
  protected modelName: string = 'individualRecords';
  protected schema: Schema = new Schema({
    parentDatasetId: { type: String, required: true },
    referenceId: { type: String, required: false },
    [Tag.Restriction]: { type: [Schema.Types.Mixed], required: false },
    personalNameStructures: { type: [Schema.Types.Mixed], required: false },
    [Tag.Sex]: { type: Schema.Types.Mixed, required: false },
    individualAttributeStructures: { type: Schema.Types.Mixed, required: false },
    individualEventStructures: { type: Schema.Types.Mixed, required: false },
    nonEventStructures: { type: Schema.Types.Mixed, required: false },
    [Tag.FamilyChild]: { type: [Schema.Types.Mixed], required: false },
    [Tag.FamilySpouse]: { type: [Schema.Types.Mixed], required: false },
    [Tag.Submitter]: { type: [Schema.Types.Mixed], required: false },
    associationStructures: { type: [Schema.Types.Mixed], required: false },
    [Tag.Alias]: { type: [Schema.Types.Mixed], required: false },
    [Tag.AncestorInterest]: { type: [Schema.Types.Mixed], required: false },
    [Tag.DescendantInt]: { type: [Schema.Types.Mixed], required: false },
    identifierStructures: { type: [Schema.Types.Mixed], required: false },
    noteStructures: { type: [Schema.Types.Mixed], required: false },
    sourceCitations: { type: [Schema.Types.Mixed], required: false },
    multimediaLinks: { type: [Schema.Types.Mixed], required: false },
    changeDate: { type: Schema.Types.Mixed, required: false },
    creationDate: { type: Schema.Types.Mixed, required: false },
  });
  protected formatter = IndividualRecordFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
