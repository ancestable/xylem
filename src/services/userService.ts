import { inject, provideSingleton } from '../ioc';
import { BaseService } from './BaseService';
import { IUserModel } from '../models';
import { PasswordEncryptionService } from './passwordEncryptionService';
import { UserRepository } from '../repositories';

@provideSingleton(UserService)
export class UserService extends BaseService<IUserModel> {

  constructor(
    @inject(UserRepository) protected repository: UserRepository,
    @inject(PasswordEncryptionService) protected passwordEncryptionService: PasswordEncryptionService,
  ) {
    super();
  }

  async create(user: IUserModel): Promise<IUserModel> {
    const encryptedPassword = await this.passwordEncryptionService.encrypt(user.password);
    const userWithEncryptedPassword: IUserModel = { ...user, password: encryptedPassword };
    const createdUser = await super.create(userWithEncryptedPassword);
    delete createdUser.password;
    return createdUser;
  }

  async getById(id: string): Promise<IUserModel> {
    const foundUser = await super.getById(id);
    delete foundUser.password;
    return foundUser;
  }

  async getByEmail(email: string): Promise<IUserModel> {
    return await this.repository.findOne({ email });
  }

  async verifyPassword(userEmail: string, password: string): Promise<boolean> {
    const user = await this.getByEmail(userEmail);
    if (!user) {
      return false;
    }

    return await this.passwordEncryptionService.verify(password, user.password);
  }
}