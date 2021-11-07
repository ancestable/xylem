import {
  AssociationStructure,
  ChangeDate,
  CreationDate,
  FamilyAttributeStructure,
  FamilyEventStructure,
  FamilyRecord,
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
import { IBaseRecord } from './baseRecord';

export interface IFamilyRecordModel extends FamilyRecord, IBaseRecord { }

export type FamilyRecordCreationModel = Omit<IFamilyRecordModel, '_id' | 'id'>;

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