import DataLoader from "dataloader"
import { Op } from "sequelize";
import { BaseContext } from "../common/contexts/base-context";
import { ICategoryId, CategoryField } from "./category.definition";
import { Category, } from "./category.model"

export type ICategoryLoader = DataLoader<ICategoryId, Category>;
export const createCategoryLoader = (ctx: BaseContext): ICategoryLoader => new DataLoader(async (keys): Promise<Category[]> => {
  const categories = await ctx.services.categoryRepository.findAll({
    runner: null,
    options: { where: { [CategoryField.id]: { [Op.in]: keys as ICategoryId[] }, }, },
  });
  return categories;
});