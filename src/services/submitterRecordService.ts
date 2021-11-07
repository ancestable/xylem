import { ISubmitterRecordModel, SubmitterRecordCreationModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { SubmitterRecordRepository } from '../repositories/mongodb/submitterRecordRepository';

@provideSingleton(SubmitterRecordService)
export class SubmitterRecordService extends BaseRecordService<ISubmitterRecordModel, SubmitterRecordCreationModel> {
  constructor(@inject(SubmitterRecordRepository) protected repository: SubmitterRecordRepository) {
    super(repository);
  }
}
