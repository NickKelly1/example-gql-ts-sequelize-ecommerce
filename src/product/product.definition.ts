import { ICategoryId } from "../category/category.definition";

export const ProductDefinition = {
  name: {
    min: 3,
    max: 100,
  },
}
export type IProductId = number;
export interface IProductAttributes {
  id: IProductId;
  category_id: ICategoryId;
  name: string;
  cost: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | Date;
}
export type IProductCreationAttributes = Omit<IProductAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
export const ProductField: {[K in keyof IProductAttributes]: K} = {
  id: 'id',
  category_id: 'category_id',
  name: 'name',
  cost: 'cost',
  price: 'price',
  created_at: 'created_at',
  deleted_at: 'deleted_at',
  updated_at: 'updated_at',
}