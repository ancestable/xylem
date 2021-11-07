import { IIndividualRecordModel, IndividualRecordCreationModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { IndividualRecordRepository } from '../repositories/mongodb/individualRecordRepository';

@provideSingleton(IndividualRecordService)
export class IndividualRecordService extends BaseRecordService<IIndividualRecordModel, IndividualRecordCreationModel> {
  constructor(@inject(IndividualRecordRepository) protected repository: IndividualRecordRepository) {
    super(repository);
  }
}
