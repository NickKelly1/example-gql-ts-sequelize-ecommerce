import { Sequelize } from "sequelize/types";
import { TransactionRunner } from "../classes/transaction-runner";
import { UniversalServiceContainer } from "../container/universal-service-container";

export class DbService {
  constructor(
    protected readonly universal: UniversalServiceContainer,
  ) {
    //
  }
  //

  /**
   * Run within a transaction
   */
  async transact<T>(fn: (arg: { runner: TransactionRunner; }) => Promise<T> | T): Promise<T> {
    const transaction = await this.universal.sequelize.transaction();
    const runner = new TransactionRunner(this.universal.sequelize, transaction);
    try {
      const result = await fn({ runner });
      transaction.commit();
      return result;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }
}