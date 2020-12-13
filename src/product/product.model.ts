import { Association, DataTypes, Model, DataType, ModelAttributes, Sequelize } from "sequelize";
import { fixSoftDeleteable } from "../common/constants/fix-soft-deletes.const";
import { fixTimestamps } from "../common/constants/fix-timestamps.const";
import { Category } from "../category/category.model";
import { CategoryField } from "../category/category.definition";
import { IProductAttributes, IProductCreationAttributes, ProductField, IProductId, ProductDefinition } from "./product.definition";

export type IProductAssociations = {
  [index: string]: Association;
  category: Association<Product, Category>;
};
export const ProductAssociation: {[K in keyof IProductAssociations]: K} = {
  category: 'category',
}

export class Product extends Model<IProductAttributes, IProductCreationAttributes> implements IProductAttributes {
  // fields
  [ProductField.id]!: IProductId;
  [ProductField.category_id]!: number;
  [ProductField.name]!: string;
  [ProductField.cost]!: number;
  [ProductField.price]!: number;
  [ProductField.created_at]!: Date;
  [ProductField.updated_at]!: Date;
  [ProductField.deleted_at]!: null | Date;

    // acceptable associations
  static associations: IProductAssociations;

  // associations
  [ProductAssociation.category]?: Category;

  // associations
  //

  // helpers
}

export function initProduct(sequelize: Sequelize) {
  Product.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
      category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Category as typeof Model, key: CategoryField.id } },
      name: { type: DataTypes.STRING(ProductDefinition.name.max), allowNull: false, },
      cost: { type: DataTypes.DECIMAL, allowNull: false, },
      price: { type: DataTypes.DECIMAL, allowNull: false, },
      ...fixTimestamps,
      ...fixSoftDeleteable,
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );
}

export function initProductRelations(sequelize: Sequelize) {
  Product.belongsTo(Category, { as: ProductAssociation.category, targetKey: CategoryField.id, foreignKey: ProductField.category_id, });
}
