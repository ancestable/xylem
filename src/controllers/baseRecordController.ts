import { DatasetService, UserService } from '../services';
import { ApiError } from '../models';
import { BaseRecordService } from '../services/baseRecordService';
import { Controller } from 'tsoa';
import { IBaseRecord } from '@ancestable/shared';
import { errorTypes } from '../utils/helper/errorHandler';

export class BaseRecordController<IRecordModel extends IBaseRecord, RecordCreationModel extends (IRecordModel & IBaseRecord)> extends Controller {
  constructor(
    private datasetService: DatasetService,
    private recordService: BaseRecordService<IRecordModel, RecordCreationModel>,
    private userService: UserService,
  ) {
    super();
  }
  
  async getById(request: any, id: string): Promise<IRecordModel> {
    const record = await this.recordService.getById(id);
    const isUserAllowed = this.isUserAllowedToRead(record.parentDatasetId, request);
    if (!isUserAllowed) throw new ApiError(errorTypes.forbidden);

    return record;
  }

  async create(request: any, body: RecordCreationModel): Promise<IRecordModel> {
    const { parentDatasetId } = body;
    if (!parentDatasetId) throw new ApiError(errorTypes.notFound);

    const foundDataset = await this.datasetService.getById(parentDatasetId);
    if (!foundDataset) throw new ApiError(errorTypes.notFound);

    const isAdmin = this.isAdmin(parentDatasetId, request);
    if (!isAdmin) throw new ApiError(errorTypes.forbidden);

    return this.recordService.create(body);
  }

  async update(id: string, request: any, body: IRecordModel): Promise<IRecordModel> {
    const foundDataset = await this.datasetService.getById(id);
    if (!foundDataset) throw new ApiError(errorTypes.notFound);
    const sourceParentDatasetId = foundDataset.id.toString();
    const isAdminInSource = this.isAdmin(sourceParentDatasetId, request);
    if (!isAdminInSource) throw new ApiError(errorTypes.forbidden);

    const { parentDatasetId: targetParentDatasetId } = body;
    const isAdminInTarget = this.isAdmin(targetParentDatasetId, request);
    if (!isAdminInTarget) throw new ApiError(errorTypes.forbidden);

    return this.recordService.update(id, body);
  }

  async delete(id: string, request: any): Promise<void> {
    const foundDataset = await this.datasetService.getById(id);
    if (!foundDataset) throw new ApiError(errorTypes.notFound);
    const parentDatasetId = foundDataset.id.toString();
    const isAdminInSource = this.isAdmin(parentDatasetId, request);
    if (!isAdminInSource) throw new ApiError(errorTypes.forbidden);

    return this.recordService.delete(id);
  }

  async getByDatasetId(request: any, datasetId: string): Promise<IRecordModel[]> {
    const isUserAllowed = this.isUserAllowedToRead(datasetId, request);
    if (!isUserAllowed) throw new ApiError(errorTypes.forbidden);
    
    return await this.recordService.getByDatasetId(datasetId);
  }

  async getUserIdFromRequest(request: any): Promise<string> {
    const { email } = request.user;
    const user = await this.userService.getByEmail(email);
    return user.id.toString();
  }

  async isAdmin(datasetId: string, request: any): Promise<boolean> {
    const userId = await this.getUserIdFromRequest(request);
    return await this.datasetService.isUserAdmin(userId, datasetId);
  }

  async isUserAllowedToRead(datasetId: string, request: any): Promise<boolean> {
    const userId = await this.getUserIdFromRequest(request);
    return await this.datasetService.isUserAssigned(userId, datasetId);
  }
}