import { Association, DataType, DataTypes, Model, Sequelize } from "sequelize";
import { fixSoftDeleteable } from "../common/constants/fix-soft-deletes.const";
import { fixTimestamps } from "../common/constants/fix-timestamps.const";
import { Product } from "../product/product.model";
import {
  ICategoryAttributes,
  ICategoryCreationAttributes,
  CategoryField,
  ICategoryId,
  CategoryDefinition
} from "./category.definition";
import { ProductField } from "../product/product.definition";


export type ICategoryAssociations = {
  [index: string]: Association;
  products: Association<Category, Product>;
};
export const CategoryAssociation: {[K in keyof ICategoryAssociations]: K} = {
  products: 'products',
}


export class Category extends Model<ICategoryAttributes, ICategoryCreationAttributes> implements ICategoryAttributes {
  // fields
  [CategoryField.id]!: ICategoryId;
  [CategoryField.name]!: string;
  [CategoryField.colour]!: string;
  [CategoryField.created_at]!: Date;
  [CategoryField.updated_at]!: Date;
  [CategoryField.deleted_at]!: null | Date;

    // acceptable associations
  static associations: ICategoryAssociations;

  // associations
  [CategoryAssociation.products]?: Product[];

  // associations
  //

  // helpers
  // isAdmin() { return this[RoleField.id] === Role.Admin; }
  // isAuthenticated() { return this[RoleField.id] === Role.Authenticated; }
  // isPublic() { return this[RoleField.id] === Role.Public; }
}

export function initCategory(sequelize: Sequelize) {
  Category.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
      name: { type: DataTypes.STRING(CategoryDefinition.name.max), allowNull: false, },
      colour: { type: DataTypes.STRING(CategoryDefinition.colour.max), allowNull: false, },
      ...fixTimestamps,
      ...fixSoftDeleteable,
    },
    {
      sequelize,
      tableName: 'categories',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );
}

export function initCategoryRelations(sequelize: Sequelize) {
  Category.hasMany(Product, { as: CategoryAssociation.products, sourceKey: CategoryField.id, foreignKey: ProductField.category_id, });
}
