import {
  IFamilyRecordModel,
  IIndividualRecordModel,
  IMultimediaRecordModel,
  IRepositoryRecordModel,
  ISharedNoteRecordModel,
  ISourceRecordModel,
  ISubmitterRecordModel,
  UserRole,
} from '@ancestable/shared';
import { BaseFormatter } from './BaseFormatter';

type UserWithRoles = { [userId: string]: UserRole };

export interface IDatasetModel {
  _id?: string;
  id?: string;
  users: UserWithRoles;
  name: string;
}

export interface IDatasetModelWithRecords extends IDatasetModel {
  familyRecords: IFamilyRecordModel[];
  individualRecords: IIndividualRecordModel[];
  multimediaRecords: IMultimediaRecordModel[];
  repositoryRecords: IRepositoryRecordModel[];
  sharedNoteRecords: ISharedNoteRecordModel[];
  sourceRecords: ISourceRecordModel[];
  submitterRecords: ISubmitterRecordModel[];
}

export type DatasetCreationModel = Omit<IDatasetModel, '_id' | 'id' | 'users'>;

export interface UserWithRole {
  userId: string;
  userRole: UserRole;
}

export class DatasetFormatter extends BaseFormatter implements IDatasetModel {
  users: UserWithRoles = {};
  name: string = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}