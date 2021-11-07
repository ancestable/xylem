import { PasswordEncryptionService } from './passwordEncryptionService';

describe('PasswordEncryptionService', () => {
  let service: PasswordEncryptionService;

  beforeEach(() => {
    service = new PasswordEncryptionService();
  });

  it('should instantiate', () => {
    expect(service).toBeTruthy();
  });

  describe('encrypt()', () => {
    it('should return an encrypted string of the password', async () => {
      const plainPassword = 'password';
      const encryptedPassword = await service.encrypt(plainPassword);
      expect(encryptedPassword).not.toBe(plainPassword);
    });
  });

  describe('validate()', () => {
    it('should return true if plain password is valid against encrypted password ', async () => {
      const plainPassword = 'password';
      const encryptedPassword = await service.encrypt(plainPassword);

      const valid = await service.verify(plainPassword, encryptedPassword);
      expect(valid).toBe(true);
    });

    it('should return false if plain password is not valid against encrypted password ', async () => {
      const plainPassword = 'password';
      const encryptedPassword = await service.encrypt(plainPassword);

      const valid = await service.verify('some-other-password', encryptedPassword);
      expect(valid).toBe(false);
    });
  });
});