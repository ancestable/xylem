import { FamilyRecordCreationModel, IFamilyRecordModel } from '@ancestable/shared';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { FamilyRecordRepository } from '../repositories';

@provideSingleton(FamilyRecordService)
export class FamilyRecordService extends BaseRecordService<IFamilyRecordModel, FamilyRecordCreationModel> {
  constructor(@inject(FamilyRecordRepository) protected repository: FamilyRecordRepository) {
    super(repository);
  }
}
