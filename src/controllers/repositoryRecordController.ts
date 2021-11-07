import {
  Body,
  Delete,
  Get,
  Post,
  Put,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from 'tsoa';

import { DatasetService, UserService } from '../services';
import { IRepositoryRecordModel, RepositoryRecordCreationModel } from '@ancestable/shared';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordController } from './baseRecordController';
import { RepositoryRecordService } from '../services/repositoryRecordService';

@Tags('repositoryRecord')
@Route('repositoryRecord')
@provideSingleton(RepositoryRecordController)
export class RepositoryRecordController extends BaseRecordController<IRepositoryRecordModel, RepositoryRecordCreationModel> {
  constructor(
    @inject(DatasetService) datasetService: DatasetService,
    @inject(RepositoryRecordService) repositoryRecordService: RepositoryRecordService,
    @inject(UserService) userService: UserService,
  ) {
    super(datasetService, repositoryRecordService, userService);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<IRepositoryRecordModel> {
    return super.getById(request, id);
  }

  @Security('jwt', ['user'])
  @Response(404, 'Not Found')
  @Post()
  async create(@Request() request: any, @Body() body: RepositoryRecordCreationModel): Promise<IRepositoryRecordModel> {
    return super.create(request, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Request() request: any, @Body() body: IRepositoryRecordModel): Promise<IRepositoryRecordModel> {
    return super.update(id, request, body);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    return super.delete(id, request);
  }

  @Security('jwt', ['user'])
  @Get('/dataset/{datasetId}')
  async getByDatasetId(@Request() request: any, datasetId: string): Promise<IRepositoryRecordModel[]> {
    return super.getByDatasetId(request, datasetId);
  }
}
