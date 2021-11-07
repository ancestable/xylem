import { FamilyRecordCreationModel, IFamilyRecordModel } from '../models/familyRecordModel';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { FamilyRecordRepository } from '../repositories';

@provideSingleton(FamilyRecordService)
export class FamilyRecordService extends BaseRecordService<IFamilyRecordModel, FamilyRecordCreationModel> {
  constructor(@inject(FamilyRecordRepository) protected repository: FamilyRecordRepository) {
    super(repository);
  }
}
