import { decorate, injectable } from 'inversify';

import { ApiError } from '../models/apiError';
import { IBaseRepository } from '../repositories/baseRepository.interface';
import { PaginationModel } from '../models/paginationModel';
import { errorTypes } from '../utils/helper/errorHandler';

export abstract class BaseService<EntityModel> {
  protected repository: IBaseRepository<EntityModel>;

  async getById(_id: string): Promise<EntityModel> {
    return this.repository.findOne({ _id });
  }

  async getPaginated(
    page: number,
    limit: number,
    fields: string,
    sort: string,
    query: string,
  ): Promise<PaginationModel> {
    const skip: number = (Math.max(1, page) - 1) * limit;
    
    // eslint-disable-next-line prefer-const
    let [count, docs] = await Promise.all([
      this.repository.count(query),
      this.repository.find(skip, limit, sort, query),
    ]);
    const fieldArray = (fields || '').split(',').map(field => field.trim()).filter(Boolean);

    if (fieldArray.length) docs = docs.map(d => {
      const attrs: any = {};
      fieldArray.forEach(f => attrs[f] = d[f]);
      return attrs;
    });

    return new PaginationModel({
      count,
      page,
      limit,
      docs,
      totalPages: Math.ceil(count / limit),
    });
  }

  async create(entity: EntityModel): Promise<EntityModel> {
    const res = await this.repository.create(entity);
    return this.getById((res as any)._id);
  }

  async update(id: string, entity: EntityModel): Promise<EntityModel> {
    await this.repository.update(id, entity);
    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    const res = await this.repository.delete(id);
    if (!res.n) throw new ApiError(errorTypes.notFound);
  }
}

decorate(injectable(), BaseService);