import {
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  Medi,
  MultimediaFormat,
  MultimediaRecord,
  NoteStructure,
  Restriction,
  SourceCitation,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { IBaseRecord } from './baseRecord';

export interface IMultimediaRecordModel extends MultimediaRecord, IBaseRecord { }

export type MultimediaRecordCreationModel = Omit<IMultimediaRecordModel, '_id' | 'id'>;

export class MultimediaRecordFormatter extends BaseFormatter implements IMultimediaRecordModel {
  parentDatasetId?: string = undefined;
  referenceId: string = undefined;
  [Tag.Restriction]: Restriction[] = [];
  [Tag.File]?: {
    value: string;
    [Tag.Format]?: {
      value: MultimediaFormat;
      [Tag.Media]?: {
        value: Medi;
        [Tag.Phrase]?: string;
      };
    };
    [Tag.Title]?: string;
    [Tag.Translation]?: {
      value: string;
      [Tag.Format]: MultimediaFormat;
    }[];
  }[] = [];
  identifierStructures?: IdentifierStructure[] = [];
  noteStructures?: NoteStructure[] = [];
  sourceCitations?: SourceCitation[] = [];
  changeDate?: ChangeDate = undefined;
  creationDate?: CreationDate = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}