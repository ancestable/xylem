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
import { IMultimediaRecordModel, MultimediaRecordCreationModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordController } from './baseRecordController';
import { MultimediaRecordService } from '../services/multimediaRecordService';

@Tags('multimediaRecord')
@Route('multimediaRecord')
@provideSingleton(MultimediaRecordController)
export class MultimediaRecordController extends BaseRecordController<IMultimediaRecordModel, MultimediaRecordCreationModel> {
  constructor(
    @inject(DatasetService) datasetService: DatasetService,
    @inject(MultimediaRecordService) multimediaRecordService: MultimediaRecordService,
    @inject(UserService) userService: UserService,
  ) {
    super(datasetService, multimediaRecordService, userService);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<IMultimediaRecordModel> {
    return super.getById(request, id);
  }

  @Security('jwt', ['user'])
  @Response(404, 'Not Found')
  @Post()
  async create(@Request() request: any, @Body() body: MultimediaRecordCreationModel): Promise<IMultimediaRecordModel> {
    return super.create(request, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Request() request: any, @Body() body: IMultimediaRecordModel): Promise<IMultimediaRecordModel> {
    return super.update(id, request, body);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    return super.delete(id, request);
  }

  @Security('jwt', ['user'])
  @Get('/dataset/{datasetId}')
  async getByDatasetId(@Request() request: any, datasetId: string): Promise<IMultimediaRecordModel[]> {
    return super.getByDatasetId(request, datasetId);
  }
}
