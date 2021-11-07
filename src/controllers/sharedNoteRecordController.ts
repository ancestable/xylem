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
import { ISharedNoteRecordModel, SharedNoteRecordCreationModel } from '@ancestable/shared';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordController } from './baseRecordController';
import { SharedNoteRecordService } from '../services/sharedNoteRecordService';

@Tags('sharedNoteRecord')
@Route('sharedNoteRecord')
@provideSingleton(SharedNoteRecordController)
export class SharedNoteRecordController extends BaseRecordController<ISharedNoteRecordModel, SharedNoteRecordCreationModel> {
  constructor(
    @inject(DatasetService) datasetService: DatasetService,
    @inject(SharedNoteRecordService) sharedNoteRecordService: SharedNoteRecordService,
    @inject(UserService) userService: UserService,
  ) {
    super(datasetService, sharedNoteRecordService, userService);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<ISharedNoteRecordModel> {
    return super.getById(request, id);
  }

  @Security('jwt', ['user'])
  @Response(404, 'Not Found')
  @Post()
  async create(@Request() request: any, @Body() body: SharedNoteRecordCreationModel): Promise<ISharedNoteRecordModel> {
    return super.create(request, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Request() request: any, @Body() body: ISharedNoteRecordModel): Promise<ISharedNoteRecordModel> {
    return super.update(id, request, body);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    return super.delete(id, request);
  }

  @Security('jwt', ['user'])
  @Get('/dataset/{datasetId}')
  async getByDatasetId(@Request() request: any, datasetId: string): Promise<ISharedNoteRecordModel[]> {
    return super.getByDatasetId(request, datasetId);
  }
}
