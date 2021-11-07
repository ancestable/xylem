import * as crypto from 'crypto';
import configuration from '../config/configuration';
import { provideSingleton } from '../ioc';


@provideSingleton(PasswordEncryptionService)
export class PasswordEncryptionService {
  private salt: string;

  constructor() {
    this.salt = configuration.encryptionSalt;      
  }

  async encrypt(password: string): Promise<string> {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); 
  }

  async verify(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const hash = crypto.pbkdf2Sync(plainPassword, this.salt, 1000, 64, 'sha512').toString('hex'); 
    return hashedPassword === hash; 
  }
}