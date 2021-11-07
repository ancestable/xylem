import * as mongooseUniqueValidator from 'mongoose-unique-validator';
import { Document, Model, Schema } from 'mongoose';
import { decorate, injectable } from 'inversify';

import { IBaseRepository } from '../baseRepository.interface';
import { MongoDbConnection } from '../../config/mongoConfiguration';
import { cleanQuery } from '../../utils/helper/requestHelper';

export abstract class BaseRepository<EntityType> implements IBaseRepository<EntityType> {
  protected dbConnection: MongoDbConnection;
  protected schema: Schema;
  protected documentModel: Model<Document>;
  protected modelName: string;
  protected formatter: any = Object;
  private initialized: boolean = false;

  protected init(): void {
    if (this.initialized) return;
    
    this.schema.plugin(mongooseUniqueValidator);
    this.documentModel = this.dbConnection.db.model(this.modelName, this.schema);
    this.initialized = true;
  }

  async create(model: EntityType): Promise<EntityType> {
    const cleanToSave = this.cleanToSave(model);

    const document: Document = await this.documentModel.create(cleanToSave);
    return new this.formatter(document);
  }

  async update(_id: string, model: EntityType): Promise<void> {
    await this.documentModel.updateOne({ _id }, this.cleanToSave(model));
  }

  async delete(_id: string): Promise<any> {
    return this.documentModel.deleteOne({ _id });
  }

  async find(
    skip: number = 0,
    limit: number = 250,
    sort: string,
    query: any,
  ): Promise<EntityType[]> {
    const sortObject = cleanQuery(sort, this.sortQueryFormatter);
    return (
      await this.documentModel
        .find(this.cleanWhereQuery(query))
        .sort(Object.keys(sortObject).map(key => [key, sortObject[key]]))
        .skip(skip)
        .limit(limit)
    )
      .map(item => new this.formatter(item));
  }

  async findAll(query: any): Promise<EntityType[]> {
    return (
      await this.documentModel
        .find(this.cleanWhereQuery(query))
    )
      .map(item => new this.formatter(item));
  }

  async findOne(query: any): Promise<EntityType> {
    const document: Document = await this.documentModel.findOne(query);
    if (!document) return null;
    return new this.formatter(document);
  }

  async count(query: any): Promise<number> {
    return this.documentModel.count(this.cleanWhereQuery(query));
  }

  protected cleanToSave(entity: EntityType): EntityType {
    return new this.formatter(entity);
  }

  protected sortQueryFormatter(key: string, value: string): number | undefined {
    if (value === 'asc') return 1;
    if (value === 'desc') return -1;
    return undefined;
  }

  protected cleanWhereQuery(query: any): { [key: string]: any } {
    if (!query || typeof query === 'string') return cleanQuery(query);

    const newQuery = { $or: [] };
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (!(value instanceof Array)) newQuery[key] = value;
      else newQuery.$or = newQuery.$or.concat(value.map(item => ({ [key]: item })));
    });
    if (!newQuery.$or.length) delete newQuery.$or;
    return newQuery;
  }
}

decorate(injectable(), BaseRepository);