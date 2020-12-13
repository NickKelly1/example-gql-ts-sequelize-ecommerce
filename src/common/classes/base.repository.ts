import { Model, ModelCtor, WhereOptions, Order, Op, OrderItem, FindOptions, Identifier } from "sequelize";
import httpErrors, { HttpError } from 'http-errors';
import { BaseContext } from "../contexts/base-context";
import { coalesceAndWhere } from "../helpers/coalesce-where.fn";
import { TransactionRunner } from "./transaction-runner";

export abstract class BaseRepository<M extends Model<any, any>> {
  protected abstract readonly Model: ModelCtor<M>;


  constructor(protected readonly ctx: BaseContext) {
    //
  }


  /**
   * Get a NotFoundError
   *
   * Overridable
   */
  protected notFoundError(): HttpError {
    return this.ctx.notFoundError();
  }


  /**
   * Assert that the argument was "found" (is not null)
   */
  protected assertFound<T>(arg: null | undefined | T): T {
    if (arg != null) return arg;
    throw this.notFoundError();
  }


  /**
   * Default dynamic scope for queries
   *
   * Overridable
   */
  protected scope(): undefined | WhereOptions<M['_attributes']> {
    return undefined;
  }


  /**
   * Default ordering
   *
   * Overridable
   */
  protected order(): undefined | Order {
    return undefined;
  }


  /**
   * Build an sequelize where clause
   *
   * @param wheres
   */
  protected buildWhere(
    wheres?: (null | undefined | WhereOptions<M['_attributes']>)[],
    options?: { unscoped?: boolean },
  ): undefined | WhereOptions<M['_attributes']> {
    const unscoped = options?.unscoped;
    const scope = unscoped ? undefined : this.scope?.();
    return coalesceAndWhere([coalesceAndWhere(wheres), scope]);
  }


  /**
   * Build an order clause
   * 
   * @param requestOrder 
   */
  protected buildOrder(
    requestOrder?: undefined | null | Order,
    opts?: {
      unordered?: boolean,
    },
  ): undefined | Order {
    const { unordered } = opts ?? {};
    const order: OrderItem[] = [];
    if (Array.isArray(requestOrder)) { order.push(...requestOrder); }
    else if (requestOrder != null) { order.push(requestOrder) }
    if (!unordered) {
      const defaultOrder = this.order();
      if (defaultOrder != null) {
        if (Array.isArray(defaultOrder)) { order.push(...defaultOrder) }
        else if (defaultOrder != null) { order.push(defaultOrder); }
      }
    }
    if (order.length) return order;
    return undefined;
  }


  /**
   * Find all
   *
   * @param arg
   */
  async findAll(arg: {
    runner: null | TransactionRunner,
    options?: Omit<FindOptions<M['_attributes']>, 'transaction'>,
    unscoped?: boolean;
  }): Promise<M[]> {
    const { runner, options, unscoped } = arg;
    const transaction = runner?.transaction;
    const { where: optionsWhere, ...otherFindOpts } = options ?? {};
    const where = this.buildWhere([optionsWhere], { unscoped });
    const result = await this.Model.findAll({
      ...otherFindOpts,
      transaction,
      where,
      order: this.buildOrder(options?.order),
    });
    return result;
  }


  /**
   * Find all (and count)
   *
   * @param arg
   */
  async findAllAndCount(arg: {
    runner: null | TransactionRunner,
    options?: Omit<FindOptions<M['_attributes']>, 'transaction'>,
    unscoped?: boolean;
    unordered?: boolean;
  }): Promise<{ rows: M[], count: number }> {
    const { runner, options, unscoped, unordered } = arg;
    const transaction = runner?.transaction;
    const { where: optionsWhere, ...otherFindOpts } = options ?? {};
    const where = this.buildWhere([optionsWhere], { unscoped });
    const result = await this.Model.findAndCountAll({
      ...otherFindOpts,
      transaction,
      where,
      order: this.buildOrder(options?.order, { unordered }),
    });
    return result;
  }


  /**
   * Find one by primary key
   * 
   * @param pk
   * @param arg
   */
  async findByPk(
    pk: Identifier,
    arg: {
      runner: null | TransactionRunner,
      options?: Omit<FindOptions<M['_attributes']>, 'transaction'>
      unscoped?: boolean;
    },
  ): Promise<null | M> {
    const { runner, options, unscoped } = arg;
    const transaction = runner?.transaction;
    const { where: optionsWhere, ...otherFindOpts } = options ?? {};
    const pkField = this.Model.primaryKeyAttribute;
    const pkWhere: WhereOptions = { [pkField]: { [Op.eq]: pk } };
    const where = this.buildWhere([optionsWhere, pkWhere], { unscoped });
    const result = await this.Model.findOne({
      ...otherFindOpts,
      transaction,
      where,
      order: this.buildOrder(options?.order),
    });
    return result;
  }


  /**
   * Find one or throw
   *
   * @param pk
   * @param arg
   */
  async findByPkOrfail(
    pk: Identifier,
    arg: {
      runner: null | TransactionRunner,
      options?: Omit<FindOptions<M['_attributes']>, 'transaction'>
      unscoped?: boolean;
    },
  ): Promise<M> {
    return this.assertFound(await this.findByPk(pk, arg));
  }


  /**
   * Find one
   *
   * @param arg
   */
  async findOne(arg: {
    runner: null | TransactionRunner,
    options?: Omit<FindOptions<M['_attributes']>, 'transaction'>
    unscoped?: boolean;
  }): Promise<null | M> {
    const { runner, options, unscoped } = arg;
    const transaction = runner?.transaction;
    const { where: optionsWhere, ...otherFindOpts } = options ?? {};
    const where = this.buildWhere([optionsWhere], { unscoped });
    const result = await this.Model.findOne({
      ...otherFindOpts,
      transaction,
      where,
      order: this.buildOrder(options?.order),
    });
    return result;
  }


  /**
   * Find one or throw
   *
   * @param arg
   */
  async findOneOrfail(arg: {
    runner: null | TransactionRunner,
    options?: Omit<FindOptions<M['_attributes']>, 'transaction'>
    unscoped?: boolean;
  }): Promise<M> {
    return this.assertFound(await this.findOne(arg));
  }
}
