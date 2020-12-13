import DataLoader from "dataloader"
import { Op } from "sequelize";
import { BaseContext } from "../common/contexts/base-context";
import { IProductId, ProductField } from "./product.definition";
import { Product } from "./product.model";

export type IProductLoader = DataLoader<IProductId, Product>;
export const createProductLoader = (ctx: BaseContext): IProductLoader => new DataLoader(async (keys): Promise<Product[]> => {
  const products = await ctx.services.productRepository.findAll({
    runner: null,
    options: { where: { [ProductField.id]: { [Op.in]: keys as IProductId[] }, }, },
  });
  return products;
});