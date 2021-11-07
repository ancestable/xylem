import { DatasetCreationModel, IDatasetModel, IDatasetModelWithRecords } from '../models/datasetModel';
import { inject, provideSingleton } from '../ioc';
import { ApiError } from '../models';
import { BaseService } from './BaseService';
import { DatasetRepository } from '../repositories/mongodb/datasetRepository';
import { FamilyRecordService } from './familyRecordService';
import { IndividualRecordService } from './individualRecordService';
import { MultimediaRecordService } from './multimediaRecordService';
import { RepositoryRecordService } from './repositoryRecordService';
import { SharedNoteRecordService } from './sharedNoteRecordService';
//import { SourceRecordService } from './sourceRecordService';
import { SubmitterRecordService } from './submitterRecordService';
import { UserRole } from '@ancestable/shared';
import { errorTypes } from '../utils/helper/errorHandler';


@provideSingleton(DatasetService)
export class DatasetService extends BaseService<IDatasetModel> {

  constructor(
    @inject(FamilyRecordService) protected familyRecordService: FamilyRecordService,
    @inject(IndividualRecordService) protected individualRecordService: IndividualRecordService,
    @inject(MultimediaRecordService) protected multimediaRecordService: MultimediaRecordService,
    @inject(RepositoryRecordService) protected repositoryRecordService: RepositoryRecordService,
    @inject(SharedNoteRecordService) protected sharedNoteRecordService: SharedNoteRecordService,
    //@inject(SourceRecordService) protected sourceRecordService: SourceRecordService,
    @inject(SubmitterRecordService) protected submitterRecordService: SubmitterRecordService,
    @inject(DatasetRepository) protected repository: DatasetRepository,
  ) {
    super();
  }

  async getWithRecordEntriesById(datasetId: string): Promise<IDatasetModelWithRecords> {
    const dataset = await this.getById(datasetId);
    const familyRecords = await this.familyRecordService.getByDatasetId(datasetId);
    const individualRecords = await this.individualRecordService.getByDatasetId(datasetId);
    const multimediaRecords = await this.multimediaRecordService.getByDatasetId(datasetId);
    const repositoryRecords = await this.repositoryRecordService.getByDatasetId(datasetId);
    const sharedNoteRecords = await this.sharedNoteRecordService.getByDatasetId(datasetId);
    const sourceRecords = [];
    const submitterRecords = await this.submitterRecordService.getByDatasetId(datasetId);

    return {
      ... dataset,
      familyRecords,
      individualRecords,
      multimediaRecords,
      repositoryRecords,
      sharedNoteRecords,
      sourceRecords,
      submitterRecords,
    };
  }

  async getAllForUser(userId: string): Promise<IDatasetModel[]> {
    return this.repository.findAll({ [`users.${userId}`]: { $exists : true }});
  }

  async createWithUserId(userId: string, dataset: DatasetCreationModel) {
    return super.create({
      users: {
        [userId]: UserRole.Admin,
      },
      ...dataset,
    });
  }

  async addUser(datasetId: string, userId: string, userRole: UserRole) {
    const dataset = await super.getById(datasetId);
    if (!dataset) throw new ApiError(errorTypes.notFound);

    const foundUser = dataset.users[userId];
    if (foundUser) throw new ApiError(errorTypes.conflict);

    dataset.users[userId] = userRole;
    await this.update(datasetId, dataset);
    return this.getById(datasetId);
  }

  async removeUser(datasetId: string, userId: string) {
    const dataset = await super.getById(datasetId);
    if (!dataset) throw new ApiError(errorTypes.notFound);

    const foundUser = dataset.users[userId];
    if (!foundUser) throw new ApiError(errorTypes.notFound);

    delete dataset.users[userId];
    await this.update(datasetId, dataset);
    return this.getById(datasetId);
  }

  async updateMetadata(id: string, creationDataset: DatasetCreationModel) {
    const currentEntry = await this.getById(id);
    const updatedEntry = { ...currentEntry, ...creationDataset };
    return super.update(id, updatedEntry);
  }

  async isUserAdmin(userId: string, datasetId: string): Promise<boolean> {
    const dataset = await super.getById(datasetId);
    const userRole = dataset.users[userId];
    if (!userRole || userRole !== UserRole.Admin) {
      return false;
    }
    return true;
  }

  async isUserAssigned(userId: string, datasetId: string): Promise<boolean> {
    const dataset = await super.getById(datasetId);
    const userRole = dataset.users[userId];

    return !!userRole;
  }
}