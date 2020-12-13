export const CategoryDefinition = {
  name: {
    min: 3,
    max: 100,
  },
  colour: {
    min: 3,
    max: 30,
  },
}
export type ICategoryId = number;
export interface ICategoryAttributes {
  id: ICategoryId;
  name: string;
  colour: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | Date;
}
export type ICategoryCreationAttributes = Omit<ICategoryAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
export const CategoryField: {[K in keyof ICategoryAttributes]: K} = {
  id: 'id',
  name: 'name',
  colour: 'colour',
  created_at: 'created_at',
  deleted_at: 'deleted_at',
  updated_at: 'updated_at',
}
