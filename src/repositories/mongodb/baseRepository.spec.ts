import * as ioc from '../../ioc';
import { BaseRepository } from './BaseRepository';
import { jest } from '@jest/globals';

// To be called for setting up inversion of control
ioc;

class Formatter {
  a: string = undefined;
  b: string = undefined;

  constructor(args?: { a: string, b: string }) {
    this.a = args?.a;
    this.b = args?.b;
  }
}

class BaseRepositoryExtension extends BaseRepository<any> {
  public documentModel: any;
  public dbConnection: any = { db: { model: jest.fn() } };
  public schema: any = { plugin: jest.fn() };
  protected formatter = Formatter;
  constructor(customStub?: jest.SpyInstance) {
    super();
    this.documentModel = customStub || jest.fn();
  }
}

describe('Mongo BaseRepository', () => {
  let repository: BaseRepositoryExtension;

  const mocks = {
    get id() {
      return 'mock-id';
    },
    get payload() {
      return {
        a: 1,
        b: 'mock-content',
      };
    },
  };

  beforeEach(() => {
    repository = new BaseRepositoryExtension();
  });

  it('should init() successfully', async () => {
    (repository as any).init();

    expect(repository.dbConnection.db.model).toBeCalledTimes(1);
    expect(repository.schema.plugin).toBeCalledTimes(1);
  });

  it('should initalize only once', async () => {
    (repository as any).init();
    (repository as any).init();
    expect(repository.dbConnection.db.model).toBeCalledTimes(1);
    expect(repository.schema.plugin).toBeCalledTimes(1);
  });

  it('should create() successfully', async () => {
    const createStub = repository.documentModel.create = jest.fn();
    const cleanToSaveSpy = jest.spyOn(repository, 'cleanToSave' as any);
    const response = await repository.create({});

    expect(response).toBeTruthy();
    expect(cleanToSaveSpy).toBeCalledTimes(1);
    expect(createStub).toBeCalledTimes(1);
  });

  it('should update() successfully', async () => {
    const updateOneStub = repository.documentModel.updateOne = jest.fn();
    const cleanToSaveSpy = jest.spyOn(repository, 'cleanToSave' as any);
    await repository.update(mocks.id, mocks.payload);

    expect(cleanToSaveSpy).toBeCalledTimes(1);
    expect(updateOneStub).toBeCalledWith(
      {
        '_id': mocks.id,
      },
      mocks.payload,
    );
  });

  it('should delete() successfully', async () => {
    const deleteStub = repository.documentModel.deleteOne = jest.fn();
    await repository.delete(mocks.id);

    expect(deleteStub).toBeCalledWith({ '_id': mocks.id });
  });
});