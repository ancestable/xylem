import {
  AddressStructure,
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  NoteStructure,
  RepositoryRecord,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { IBaseRecord } from './baseRecord';

export interface IRepositoryRecordModel extends RepositoryRecord, IBaseRecord { }

export type RepositoryRecordCreationModel = Omit<IRepositoryRecordModel, '_id' | 'id'>;

export class RepositoryRecordFormatter extends BaseFormatter implements IRepositoryRecordModel {
  parentDatasetId?: string = undefined;
  referenceId: string = undefined;
  [Tag.Name]: string = undefined;
  addressStructure?: AddressStructure = undefined;
  [Tag.Phone]?: string[] = [];
  [Tag.Email]?: string[] = [];
  [Tag.Fax]?: string[] = [];
  [Tag.Web]?: string[] = [];
  noteStructures?: NoteStructure[] = [];
  identifierStructures?: IdentifierStructure[] = [];
  changeDate?: ChangeDate = undefined;
  creationDate?: CreationDate = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}