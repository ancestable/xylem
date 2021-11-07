import * as jsonwebtoken from 'jsonwebtoken';
import { ApiError, IUserModel, LoginModel, LoginResponseModel, UserCreationModel } from '../models';
import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  Tags,
} from 'tsoa';

import { inject, provideSingleton } from '../ioc';
import { UserService } from '../services';
import configuration from '../config/configuration';
import { errorTypes } from '../utils/helper/errorHandler';

@Tags('auth')
@Route('auth')
@provideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(UserService) private userService: UserService) {
    super();
  }
  
  @Response(404, 'Email or password not valid')
  @Post('login')
  async login(@Body() body: LoginModel): Promise<LoginResponseModel> {
    const { email, password } = body;
    const isValidPassword = await this.userService.verifyPassword(email, password);

    if (!isValidPassword) {
      throw new ApiError(errorTypes.notFound);
    }

    const expiresIn = configuration.tokenExpireDuration;
    const authToken = jsonwebtoken.sign({ email, scopes: ['user'] }, configuration.jwtSecret, { expiresIn });
    this.setHeader('Set-Cookie', `token=${authToken}; HttpOnly`);

    return {
      authToken,
      expiresIn,
    };
  }

  @Post('register')
  async register(@Body() body: UserCreationModel): Promise<IUserModel> {
    const foundUser = await this.userService.getByEmail(body.email);
    if (foundUser) {
      throw new ApiError(errorTypes.conflict);
    }
    return this.userService.create(body);
  }
}