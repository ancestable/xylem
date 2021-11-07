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
import { ISubmitterRecordModel, SubmitterRecordCreationModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordController } from './baseRecordController';
import { SubmitterRecordService } from '../services/submitterRecordService';

@Tags('submitterRecord')
@Route('submitterRecord')
@provideSingleton(SubmitterRecordController)
export class SubmitterRecordController extends BaseRecordController<ISubmitterRecordModel, SubmitterRecordCreationModel> {
  constructor(
    @inject(DatasetService) datasetService: DatasetService,
    @inject(SubmitterRecordService) submitterRecordService: SubmitterRecordService,
    @inject(UserService) userService: UserService,
  ) {
    super(datasetService, submitterRecordService, userService);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<ISubmitterRecordModel> {
    return super.getById(request, id);
  }

  @Security('jwt', ['user'])
  @Response(404, 'Not Found')
  @Post()
  async create(@Request() request: any, @Body() body: SubmitterRecordCreationModel): Promise<ISubmitterRecordModel> {
    return super.create(request, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Request() request: any, @Body() body: ISubmitterRecordModel): Promise<ISubmitterRecordModel> {
    return super.update(id, request, body);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    return super.delete(id, request);
  }

  @Security('jwt', ['user'])
  @Get('/dataset/{datasetId}')
  async getByDatasetId(@Request() request: any, datasetId: string): Promise<ISubmitterRecordModel[]> {
    return super.getByDatasetId(request, datasetId);
  }
}
