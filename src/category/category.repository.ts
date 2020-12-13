import { ModelCtor } from "sequelize";
import { BaseContext } from "../common/contexts/base-context";
import { BaseRepository } from "../common/classes/base.repository";
import { Category } from "./category.model";

export class CategoryRepository extends BaseRepository<Category> {
  protected readonly Model = Category as ModelCtor<Category>;
}
