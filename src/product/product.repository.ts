import { ModelCtor } from "sequelize";
import { BaseContext } from "../common/contexts/base-context";
import { BaseRepository } from "../common/classes/base.repository";
import { Product } from "./product.model";

export class ProductRepository extends BaseRepository<Product> {
  protected readonly Model = Product as ModelCtor<Product>;
}