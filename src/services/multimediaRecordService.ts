import { IMultimediaRecordModel, MultimediaRecordCreationModel } from '@ancestable/shared';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { MultimediaRecordRepository } from '../repositories/mongodb/multimediaRecordRepository';

@provideSingleton(MultimediaRecordService)
export class MultimediaRecordService extends BaseRecordService<IMultimediaRecordModel, MultimediaRecordCreationModel> {
  constructor(@inject(MultimediaRecordRepository) protected repository: MultimediaRecordRepository) {
    super(repository);
  }
}
