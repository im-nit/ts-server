import mongoose, { Document, FlattenMaps, Model, Require_id, UpdateQuery } from 'mongoose';

export class BaseServices<M extends Document, Q> {
  constructor(protected model: Model<M>) {}

  async count(query?: mongoose.FilterQuery<Q>): Promise<number> {
    return this.model.countDocuments(query).exec();
  }

  async getAll(
    filter?: mongoose.FilterQuery<Q>,
    { limit = 5, projection = {}, skip = 0 }: any = {}
  ): Promise<Require_id<FlattenMaps<M>>[]> {
    return this.model
      .find(filter)
      .select(Object.assign({}, projection, { __v: false }) as Record<string, number | boolean | object>)
      .skip(skip as number)
      .limit(limit as number)
      .lean()
      .exec();
  }

  async create(data: Q): Promise<Require_id<FlattenMaps<M>>> {
    return this.model.create(data) as Promise<Require_id<FlattenMaps<M>>>;
  }

  async updateOne(
    id: mongoose.Types.ObjectId,
    data: Partial<Q>,
    options?: mongoose.QueryOptions
  ): Promise<Require_id<FlattenMaps<M>> | null> {
    return this.model
      .findByIdAndUpdate(id, data as UpdateQuery<M>, options)
      .lean()
      .exec() as Promise<Require_id<FlattenMaps<M>> | null>;
  }

  async deleteOne(id: mongoose.Types.ObjectId): Promise<Require_id<FlattenMaps<M>> | null> {
    return this.model.findByIdAndDelete(id).lean().exec() as Promise<Require_id<FlattenMaps<M>> | null>;
  }

  async findOne(
    filter: mongoose.FilterQuery<Q>,
    projection?: mongoose.ProjectionFields<Q>
  ): Promise<Require_id<FlattenMaps<M>> | null> {
    return this.model
      .findOne(filter)
      .select(Object.assign({}, projection, { __v: false }) as Record<string, number | boolean | object>)
      .lean()
      .exec() as Promise<Require_id<FlattenMaps<M>> | null>;
  }

  async findOneAndUpdate(
    filter: mongoose.FilterQuery<Q>,
    data: Partial<Q>,
    options?: mongoose.QueryOptions
  ): Promise<Require_id<FlattenMaps<M>> | null> {
    return this.model
      .findOneAndUpdate(filter, data as UpdateQuery<M>, options)
      .lean()
      .exec() as Promise<Require_id<FlattenMaps<M>> | null>;
  }

  async findById(id: mongoose.Types.ObjectId): Promise<Require_id<FlattenMaps<M>> | null> {
    return this.model.findById(id).lean().exec() as Promise<Require_id<FlattenMaps<M>> | null>;
  }

  async aggregate(pipeline: any[]): Promise<Require_id<FlattenMaps<M>>[]> {
    return this.model.aggregate(pipeline).exec() as Promise<Require_id<FlattenMaps<M>>[]>;
  }

  async aggregatePaginate(pipeline: any[], { limit = 5, skip = 0 }: any = {}): Promise<Require_id<FlattenMaps<M>>[]> {
    return this.model
      .aggregate(pipeline)
      .skip(skip as number)
      .limit(limit as number)
      .exec() as Promise<Require_id<FlattenMaps<M>>[]>;
  }
}
