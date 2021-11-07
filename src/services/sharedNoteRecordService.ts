import { ISharedNoteRecordModel, SharedNoteRecordCreationModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordService } from './baseRecordService';
import { SharedNoteRecordRepository } from '../repositories/mongodb/sharedNoteRecordRepository';

@provideSingleton(SharedNoteRecordService)
export class SharedNoteRecordService extends BaseRecordService<ISharedNoteRecordModel, SharedNoteRecordCreationModel> {
  constructor(@inject(SharedNoteRecordRepository) protected repository: SharedNoteRecordRepository) {
    super(repository);
  }
}
