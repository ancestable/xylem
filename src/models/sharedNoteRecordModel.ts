import {
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  Mime,
  SharedNoteRecord,
  SourceCitation,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { IBaseRecord } from './baseRecord';

export interface ISharedNoteRecordModel extends SharedNoteRecord, IBaseRecord { }

export type SharedNoteRecordCreationModel = Omit<ISharedNoteRecordModel, '_id' | 'id'>;

export class SharedNoteRecordFormatter extends BaseFormatter implements ISharedNoteRecordModel {
  parentDatasetId?: string = undefined;
  referenceId: string = undefined;
  value: string = undefined;
  [Tag.Mime]?: Mime = undefined;
  [Tag.Language]?: string = undefined;
  [Tag.Translation]?: {
    value: string;
    [Tag.Mime]?: Mime;
    [Tag.Language]?: string;
  }[] = [];
  sourceCitations?: SourceCitation[] = [];
  identifierStructures?: IdentifierStructure[] = [];
  changeDate?: ChangeDate = undefined;
  creationDate?: CreationDate = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}