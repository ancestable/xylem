import { ISourceRecordModel, SourceRecordCreationModel } from '@ancestable/shared';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { SourceRecordRepository } from '../repositories/mongodb/sourceRecordRepository';

@provideSingleton(SourceRecordService)
export class SourceRecordService extends BaseRecordService<ISourceRecordModel, SourceRecordCreationModel> {
  constructor(@inject(SourceRecordRepository) protected repository: SourceRecordRepository) {
    super(repository);
  }
}
