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

import { DatasetService, FamilyRecordService, UserService } from '../services';
import { FamilyRecordCreationModel, IFamilyRecordModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordController } from './baseRecordController';

@Tags('familyRecord')
@Route('familyRecord')
@provideSingleton(FamilyRecordController)
export class FamilyRecordController extends BaseRecordController<IFamilyRecordModel, FamilyRecordCreationModel> {
  constructor(
    @inject(DatasetService) datasetService: DatasetService,
    @inject(FamilyRecordService) familyRecordService: FamilyRecordService,
    @inject(UserService) userService: UserService,
  ) {
    super(datasetService, familyRecordService, userService);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<IFamilyRecordModel> {
    return super.getById(request, id);
  }

  @Security('jwt', ['user'])
  @Response(404, 'Not Found')
  @Post()
  async create(@Request() request: any, @Body() body: FamilyRecordCreationModel): Promise<IFamilyRecordModel> {
    return super.create(request, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Request() request: any, @Body() body: IFamilyRecordModel): Promise<IFamilyRecordModel> {
    return super.update(id, request, body);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    return super.delete(id, request);
  }

  @Security('jwt', ['user'])
  @Get('/dataset/{datasetId}')
  async getByDatasetId(@Request() request: any, datasetId: string): Promise<IFamilyRecordModel[]> {
    return super.getByDatasetId(request, datasetId);
  }
}
