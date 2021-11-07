import { BaseFormatter } from './BaseFormatter';
import { IUserModel } from '@ancestable/shared';

export class UserFormatter extends BaseFormatter implements IUserModel {
  email: string = undefined;
  password: string = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}