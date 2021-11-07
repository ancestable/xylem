import { IUserModel, UserFormatter } from '../../models';
import { inject, provideSingleton } from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { Schema } from 'mongoose';

@provideSingleton(UserRepository)
export class UserRepository extends BaseRepository<IUserModel> {
  protected modelName: string = 'users';
  protected schema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  protected formatter = UserFormatter;

  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}