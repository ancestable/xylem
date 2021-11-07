import { BaseRepository } from '../repositories/mongodb/BaseRepository';
import { BaseService } from './BaseService';
import { IBaseRecord } from '../models/baseRecord';

export abstract class BaseRecordService<IRecordModel, RecordCreationModel extends (IRecordModel & IBaseRecord)> extends BaseService<IRecordModel> {

  constructor(
    protected repository: BaseRepository<IRecordModel>,
  ) {
    super();
  }

  async createBulk(records: RecordCreationModel[], parentDatasetId: string): Promise<IRecordModel[]> {
    const recordCreationPomises = records.map(record => {
      record.parentDatasetId = parentDatasetId;
      return this.create(record);
    });
    return await Promise.all(recordCreationPomises);
  }

  async getByDatasetId(parentDatasetId: string): Promise<IRecordModel[]> {
    return await this.repository.findAll({ parentDatasetId });
  }
}