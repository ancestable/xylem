import {
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  Medi,
  MultimediaFormat,
  NoteStructure,
  Restriction,
  SourceCitation,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { IMultimediaRecordModel } from '@ancestable/shared';

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