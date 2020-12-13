import { Sequelize } from "sequelize/types";
import { DbService } from "../services/db.service";

/**
 * Would call it GlobalServiceContainer but global is a reserved word...
 */
export class UniversalServiceContainer {
  public readonly dbService: DbService;

  constructor(
    public readonly sequelize: Sequelize,
  ) {
    this.dbService = new DbService(this);
  }
}