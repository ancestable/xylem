import {
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  Mime,
  SourceCitation,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { ISharedNoteRecordModel } from '@ancestable/shared';

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