import { Sequelize, Transaction } from "sequelize";

export class TransactionRunner {
  constructor(
    protected readonly sequelize: Sequelize,
    public readonly transaction: Transaction,
  ) {
    //
  }

  //
}
