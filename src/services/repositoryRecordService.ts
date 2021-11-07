import { IRepositoryRecordModel, RepositoryRecordCreationModel } from '@ancestable/shared';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { RepositoryRecordRepository } from '../repositories/mongodb/repositoryRecordRepository';

@provideSingleton(RepositoryRecordService)
export class RepositoryRecordService extends BaseRecordService<IRepositoryRecordModel, RepositoryRecordCreationModel> {
  constructor(@inject(RepositoryRecordRepository) protected repository: RepositoryRecordRepository) {
    super(repository);
  }
}
