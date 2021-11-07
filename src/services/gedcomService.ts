import { Dataset } from '@ancestable/gedcom7models';
import { gedcomToJson } from '@ancestable/gedcom2json';
import { provideSingleton } from '../ioc';

@provideSingleton(GedcomService)
export class GedcomService {

  constructor() { }

  async parse(file: ArrayBuffer): Promise<Dataset> {
    return gedcomToJson(file);
  }
}