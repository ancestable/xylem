import { BaseFormatter } from './BaseFormatter';

export interface IUserModel {
  _id?: string;
  id?: string;
  email: string;
  password: string;
}

export type UserCreationModel = Pick<IUserModel, 'email' | 'password'>;
export type LoginModel = Pick<IUserModel, 'email' | 'password'>;
export interface LoginResponseModel {
  authToken: string;
  expiresIn: string;
}

export class UserFormatter extends BaseFormatter implements IUserModel {
  email: string = undefined;
  password: string = undefined;

  constructor(args: any) {
    super();
    this.format(args);
  }
}