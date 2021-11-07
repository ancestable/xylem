import {
  Controller,
  File,
  FormField,
  Post,
  Request,
  Route,
  Security,
  Tags,
  UploadedFile,
} from 'tsoa';
import { DatasetService, FamilyRecordService, GedcomService, UserService } from '../services';

import { inject, provideSingleton } from '../ioc';
import { IDatasetModelWithRecords } from '../models';
import { IndividualRecordService } from '../services/individualRecordService';
import { MultimediaRecordService } from '../services/multimediaRecordService';
import { RepositoryRecordService } from '../services/repositoryRecordService';
import { SharedNoteRecordService } from '../services/sharedNoteRecordService';
import { SourceRecordService } from '../services/sourceRecordService';
import { SubmitterRecordService } from '../services/submitterRecordService';

@Tags('gedcom')
@Route('gedcom')
@provideSingleton(GedcomController)
export class GedcomController extends Controller {
  constructor(
    @inject(DatasetService) private datasetService: DatasetService,
    @inject(FamilyRecordService) private familyRecordService: FamilyRecordService,
    @inject(IndividualRecordService) private individualRecordService: IndividualRecordService,
    @inject(MultimediaRecordService) private multimediaRecordService: MultimediaRecordService,
    @inject(RepositoryRecordService) private repositoryRecordService: RepositoryRecordService,
    @inject(SharedNoteRecordService) private sharedRecordService: SharedNoteRecordService,
    @inject(SourceRecordService) private sourceRecordService: SourceRecordService,
    @inject(SubmitterRecordService) private submitterRecordService: SubmitterRecordService,
    @inject(GedcomService) private gedcomService: GedcomService,
    @inject(UserService) private userService: UserService,
  ) {
    super();
  }
  
  @Security('jwt', ['user'])
  @Post('upload')
  async uploadGedcom(@Request() request: any, @UploadedFile() file: File, @FormField() name: string): Promise<IDatasetModelWithRecords> {
    const { email } = request.user;
    const user = await this.userService.getByEmail(email);
    const dataset = await this.datasetService.createWithUserId(user.id.toString(), {
      name,
    });

    const gedcom = await this.gedcomService.parse(file.buffer);
    await this.familyRecordService.createBulk(gedcom.FAM, dataset.id.toString());
    await this.individualRecordService.createBulk(gedcom.INDI, dataset.id.toString());
    await this.multimediaRecordService.createBulk(gedcom.MEDI, dataset.id.toString());
    await this.repositoryRecordService.createBulk(gedcom.REPO, dataset.id.toString());
    await this.sharedRecordService.createBulk(gedcom.NOTE, dataset.id.toString());
    await this.sourceRecordService.createBulk(gedcom.SOUR, dataset.id.toString());
    await this.submitterRecordService.createBulk(gedcom.SUBM, dataset.id.toString());
    this.setStatus(200);

    return this.datasetService.getWithRecordEntriesById(dataset.id.toString());
  }
}