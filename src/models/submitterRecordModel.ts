import {
  AddressStructure,
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  MultimediaLink,
  NoteStructure,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { ISubmitterRecordModel } from '@ancestable/shared';

export class SubmitterRecordFormatter extends BaseFormatter implements ISubmitterRecordModel {
  parentDatasetId?: string = undefined;
  referenceId: string;
  [Tag.Name]: string;
  addressStructure?: AddressStructure = undefined;
  [Tag.Phone]?: string[] = [];
  [Tag.Email]?: string[] = [];
  [Tag.Fax]?: string[] = [];
  [Tag.Web]?: string[] = [];
  multiMediaLinks?: MultimediaLink[] = [];
  [Tag.Language]?: string[] = [];
  identifierStructures?: IdentifierStructure[] = [];
  noteStructures?: NoteStructure[] = [];
  changeDate?: ChangeDate = undefined;
  creationDate?: CreationDate = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}