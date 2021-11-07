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
import { ISourceRecordModel, SourceRecordCreationModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordController } from './baseRecordController';
import { SourceRecordService } from '../services/sourceRecordService';

@Tags('sourceRecord')
@Route('sourceRecord')
@provideSingleton(SourceRecordController)
export class SourceRecordController extends BaseRecordController<ISourceRecordModel, SourceRecordCreationModel> {
  constructor(
    @inject(DatasetService) datasetService: DatasetService,
    @inject(SourceRecordService) sourceRecordService: SourceRecordService,
    @inject(UserService) userService: UserService,
  ) {
    super(datasetService, sourceRecordService, userService);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<ISourceRecordModel> {
    return super.getById(request, id);
  }

  @Security('jwt', ['user'])
  @Response(404, 'Not Found')
  @Post()
  async create(@Request() request: any, @Body() body: SourceRecordCreationModel): Promise<ISourceRecordModel> {
    return super.create(request, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Request() request: any, @Body() body: ISourceRecordModel): Promise<ISourceRecordModel> {
    return super.update(id, request, body);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    return super.delete(id, request);
  }

  @Security('jwt', ['user'])
  @Get('/dataset/{datasetId}')
  async getByDatasetId(@Request() request: any, datasetId: string): Promise<ISourceRecordModel[]> {
    return super.getByDatasetId(request, datasetId);
  }
}
