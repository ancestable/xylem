import {
  AddressStructure,
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  NoteStructure,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { IRepositoryRecordModel } from '@ancestable/shared';

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