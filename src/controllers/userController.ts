import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Response,
  Route,
  Security,
  Tags,
} from 'tsoa';

import { IPaginationModel, IUserModel, UserCreationModel } from '../models';
import { inject, provideSingleton } from '../ioc';
import { UserService } from '../services';

@Tags('users')
@Route('users')
@provideSingleton(UserController)
export class UserController extends Controller {
  constructor(@inject(UserService) private service: UserService) {
    super();
  }
  
  @Security('jwt', ['user'])
  @Get('{id}')
  async getById(id: string): Promise<IUserModel> {
    return this.service.getById(id);
  }

  @Get()
  async getPaginated(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('fields') fields?: string,
    @Query('sort') sort?: string,
    @Query('q') q?: string): Promise<IPaginationModel> {
    return this.service.getPaginated(page, limit, fields, sort, q);
  }

  @Response(400, 'Bad request')
  @Post()
  async create(@Body() body: UserCreationModel): Promise<IUserModel> {
    return this.service.create(body);
  }

  @Response(400, 'Bad request')
  @Put('{id}')
  async update(id: string, @Body() body: IUserModel): Promise<IUserModel> {
    return this.service.update(id, body);
  }

  @Delete('{id}')
  async delete(id: string): Promise<void> {
    return this.service.delete(id);
  }
}