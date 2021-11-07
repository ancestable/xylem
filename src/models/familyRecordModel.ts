import {
  AssociationStructure,
  ChangeDate,
  CreationDate,
  FamilyAttributeStructure,
  FamilyEventStructure,
  IndiPointer,
  MultimediaLink,
  NonEventStructure,
  NoteStructure,
  Restriction,
  SourceCitation,
  SubmPointer,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { IFamilyRecordModel } from '@ancestable/shared';

export class FamilyRecordFormatter extends BaseFormatter implements IFamilyRecordModel {
  parentDatasetId?: string = undefined;
  referenceId: string = undefined;
  [Tag.Restriction]: Restriction[] = [];
  [Tag.Husband]?: IndiPointer = undefined;
  [Tag.Wife]?: IndiPointer = undefined;
  [Tag.Child]?: IndiPointer[] = [];
  familyAttributeStructures?: FamilyAttributeStructure[] = [];
  familyEventStructures?: FamilyEventStructure[] = [];
  nonEventStructures?: NonEventStructure[] = [];
  associationStructures?: AssociationStructure[] = [];
  [Tag.Submitter]?: SubmPointer[] = [];
  noteStructures?: NoteStructure[] = [];
  sourceCitations?: SourceCitation[] = [];
  multimediaLinks?: MultimediaLink[] = [];
  changeDate?: ChangeDate = undefined;
  creationDate?: CreationDate = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}