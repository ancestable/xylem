import {
  Body,
  Controller,
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

import { DatasetCreationModel, IDatasetModel, IDatasetModelWithRecords, UserWithRole } from '../models/datasetModel';
import { inject, provideSingleton } from '../ioc';
import { ApiError } from '../models';
import { DatasetService } from '../services/datasetService';
import { UserService } from '../services';
import { errorTypes } from '../utils/helper/errorHandler';

@Tags('dataset')
@Route('dataset')
@provideSingleton(DatasetController)
export class DatasetController extends Controller {
  constructor(
    @inject(DatasetService) private datasetService: DatasetService,
    @inject(UserService) private userService: UserService,
  ) {
    super();
  }

  @Security('jwt', ['user'])
  @Get('')
  async getAll(@Request() request: any): Promise<IDatasetModel[]> {
    const userId = await this.getUserIdFromRequest(request);

    return await this.datasetService.getAllForUser(userId);
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(@Request() request: any, id: string): Promise<IDatasetModel> {
    const isUserAllowed = this.isUserAllowedToRead(id, request);
    if (!isUserAllowed) throw new ApiError(errorTypes.forbidden);
    return this.datasetService.getById(id);
  }

  @Security('jwt', ['user'])
  @Get('{id}/full')
  async getWithRecordEntriesById(@Request() request: any, id: string): Promise<IDatasetModelWithRecords> {
    const isUserAllowed = this.isUserAllowedToRead(id, request);
    if (!isUserAllowed) throw new ApiError(errorTypes.forbidden);
    return this.datasetService.getWithRecordEntriesById(id);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Post()
  async create(@Request() request: any, @Body() body: DatasetCreationModel): Promise<IDatasetModel> {
    const userId = await this.getUserIdFromRequest(request);
    return this.datasetService.createWithUserId(userId, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Put('/{id}')
  async updateMetadata(id: string, @Request() request: any, @Body() body: DatasetCreationModel): Promise<IDatasetModel> {
    const isAdmin = await this.isAdmin(id, request);
    if (!isAdmin) throw new ApiError(errorTypes.forbidden);

    return this.datasetService.updateMetadata(id, body);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Post('/{id}/user')
  async addUserToDataset(id: string, @Request() request: any, @Body() body: UserWithRole): Promise<IDatasetModel> {
    const isAdmin = await this.isAdmin(id, request);
    if (!isAdmin) throw new ApiError(errorTypes.forbidden);

    const { userId, userRole } = body;
    return this.datasetService.addUser(id, userId, userRole);
  }

  @Security('jwt', ['user'])
  @Response(400, 'Bad request')
  @Delete('/{id}/user/{userId}')
  async removeUserFromDataset(id: string, userId: string, @Request() request: any): Promise<IDatasetModel> {
    const requestUserId = await this.getUserIdFromRequest(request);
    if (requestUserId === userId) throw new ApiError(errorTypes.conflict);

    const isAdmin = await this.isAdmin(id, request);
    if (!isAdmin) throw new ApiError(errorTypes.forbidden);

    return this.datasetService.removeUser(id, userId);
  }

  @Security('jwt', ['user'])
  @Delete('{id}')
  async delete(id: string, @Request() request: any): Promise<void> {
    const isAdmin = await this.isAdmin(id, request);
    if (!isAdmin) throw new ApiError(errorTypes.forbidden);

    return this.datasetService.delete(id);
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