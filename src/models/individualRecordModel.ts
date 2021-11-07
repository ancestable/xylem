import {
  AssociationStructure,
  ChangeDate,
  CreationDate,
  FamPointer,
  FamcStat,
  IdentifierStructure,
  IndiPointer,
  IndividualAttributeStructure,
  IndividualEventStructure,
  IndividualRecord,
  MultimediaLink,
  NonEventStructure,
  NoteStructure,
  Pedi,
  PersonalNameStructure,
  Restriction,
  Sex,
  SourceCitation,
  SubmPointer,
  Tag,
} from '@ancestable/gedcom7models';
import { BaseFormatter } from './BaseFormatter';
import { IBaseRecord } from './baseRecord';

export interface IIndividualRecordModel extends IndividualRecord, IBaseRecord { }

export type IndividualRecordCreationModel = Omit<IIndividualRecordModel, '_id' | 'id'>;

export class IndividualRecordFormatter extends BaseFormatter implements IIndividualRecordModel {
  parentDatasetId?: string = undefined;
  referenceId: string = undefined;
  [Tag.Restriction]?: Restriction[] = [];
  personalNameStructures?: PersonalNameStructure[] = [];
  [Tag.Sex]?: Sex = undefined;
  individualAttributeStructures?: IndividualAttributeStructure[] = [];
  individualEventStructures?: IndividualEventStructure[] = [];
  nonEventStructures?: NonEventStructure[] = [];
  [Tag.FamilyChild]?: {
    reference: FamPointer;
    [Tag.Pedigree]?: {
      value: Pedi;
      [Tag.Phrase]?: string;
    };
    [Tag.Status]?: {
      value: FamcStat;
      [Tag.Phrase]?: string;
    };
    noteStructures?: NoteStructure[];
  }[] = [];
  [Tag.FamilySpouse]?: {
    reference: FamPointer;
    noteStructures?: NoteStructure[];
  }[] = [];
  [Tag.Submitter]?: SubmPointer[] = [];
  associationStructures?: AssociationStructure[] = [];
  [Tag.Alias]?: {
    reference: IndiPointer;
    [Tag.Phrase]?: string;
  }[] = [];
  [Tag.AncestorInterest]?: SubmPointer[] = [];
  [Tag.DescendantInt]?: SubmPointer[] = [];
  identifierStructures?: IdentifierStructure[] = [];
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