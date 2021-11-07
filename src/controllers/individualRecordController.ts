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
import { IIndividualRecordModel, IndividualRecordCreationModel } from '@ancestable/shared';
import { inject, provideSingleton } from '../ioc';
import { BaseRecordController } from './baseRecordController';
import { IndividualRecordService } from '../services/individualRecordService';

@Tags('individualRecord')
@Route('individualRecord')
@provideSingleton(IndividualRecordController)
export class IndividualRecordController extends BaseRecordController<IIndividualRecordModel, IndividualRecordCreationModel> {
  constructor(
    @inject(DatasetService) datasetService: DatasetService,
    @inject(IndividualRecordService) individualRecordService: IndividualRecordService,
    @inject(UserService) userService: UserService,
  ) {
    super(datasetService, individualRecordService, userService);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<IIndividualRecordModel> {
    return super.getById(request, id);
  }

  @Security('jwt', ['user'])
  @Response(404, 'Not Found')
  @Post()
  async create(@Request() request: any, @Body() body: IndividualRecordCreationModel): Promise<IIndividualRecordModel> {
    return super.create(request, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Request() request: any, @Body() body: IIndividualRecordModel): Promise<IIndividualRecordModel> {
    return super.update(id, request, body);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    return super.delete(id, request);
  }

  @Security('jwt', ['user'])
  @Get('/dataset/{datasetId}')
  async getByDatasetId(@Request() request: any, datasetId: string): Promise<IIndividualRecordModel[]> {
    return super.getByDatasetId(request, datasetId);
  }
}
