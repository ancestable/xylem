import {
  ChangeDate,
  CreationDate,
  IdentifierStructure,
  Mime,
  MultimediaLink,
  NoteStructure,
  PlaceStructure,
  SourceRepositoryCitation,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { ISourceRecordModel } from '@ancestable/shared';

export class SourceRecordFormatter extends BaseFormatter implements ISourceRecordModel {
  parentDatasetId?: string = undefined;
  referenceId: string;
  [Tag.Data]?: {
    [Tag.Event]?: {
      value: string;
      [Tag.Date]?: {
        value: string;
        [Tag.Phrase]?: string;
      };
      placeStructure?: PlaceStructure;
    };
    [Tag.Agency]?: string;
    noteStructures?: NoteStructure[];
  } = undefined;
  [Tag.Author]?: string = undefined;
  [Tag.Abbreviation]?: string = undefined;
  [Tag.Publication]?: string = undefined;
  [Tag.Text]?: {
    value: string;
    [Tag.Mime]?: Mime;
    [Tag.Language]: string;
  } = undefined;
  sourceRepositoryCitation?: SourceRepositoryCitation[] = [];
  identifierStructures?: IdentifierStructure[] = [];
  noteStructures?: NoteStructure[] = [];
  multiMediaLinks?: MultimediaLink[] = [];
  changeDate?: ChangeDate = undefined;
  creationDate?: CreationDate = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}