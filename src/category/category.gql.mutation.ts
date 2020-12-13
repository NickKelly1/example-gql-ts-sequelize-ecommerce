import { GraphQLObjectType, GraphQLNonNull, Thunk, GraphQLFieldConfigMap, GraphQLFloat, GraphQLInputObjectType, GraphQLString } from "graphql";
import Joi from "joi";
import { colourHashRegex } from "../common/contexts/colour-hash.regex";
import { GqlContext } from "../common/contexts/gql-context";
import { assertValid } from "../common/helpers/assert-valid.fn";
import { CategoryDefinition } from "./category.definition";
import { CategoryNodeGql, ICategoryNodeGqlSource } from "./category.gql.node";
import { Category } from "./category.model";

/**
 * Create Category Input
 */

interface ICreateCategoryGqlInput {
  name: string;
  colour: string;
}

const CreateCategoryGqlInputValidator = Joi.object<ICreateCategoryGqlInput>({
  name: Joi.string().min(CategoryDefinition.name.min).max(CategoryDefinition.name.max).required(),
  colour: Joi.string().regex(colourHashRegex).min(CategoryDefinition.colour.min).max(CategoryDefinition.colour.max).required(),
});

const CreateCategoryGqlInput = new GraphQLInputObjectType({
  name: 'CreateCategory',
  fields: {
    name: { type: GraphQLNonNull(GraphQLString), },
    colour: { type: GraphQLNonNull(GraphQLString), },
  },
});

/**
 * Update Category Input
 */

interface IUpdateCategoryGqlInput {
  id: number;
  name?: string;
  colour?: string;
}

const UpdateCategoryGqlInputValidator = Joi.object<IUpdateCategoryGqlInput>({
  id: Joi.number().required(),
  name: Joi.string().min(CategoryDefinition.name.min).max(CategoryDefinition.name.max).optional(),
  colour: Joi.string().regex(colourHashRegex).min(CategoryDefinition.colour.min).max(CategoryDefinition.colour.max).optional(),
});

const UpdateCategoryGqlInput = new GraphQLInputObjectType({
  name: 'UpdateCategory',
  fields: {
    id: { type: GraphQLNonNull(GraphQLFloat), },
    name: { type: GraphQLString, },
    colour: { type: GraphQLString, },
  },
});

/**
 * Mutation Fields
 */
export const CategoryGqlMutation: Thunk<GraphQLFieldConfigMap<unknown, GqlContext>> = () => ({
  createCategory: {
    type: GraphQLNonNull(CategoryNodeGql),
    args: { dto: { type: GraphQLNonNull(CreateCategoryGqlInput), }, },
    resolve: async (parent, args, ctx): Promise<ICategoryNodeGqlSource> => {
      const dto = assertValid(CreateCategoryGqlInputValidator, args.dto);
      const category = Category.build({
        name: dto.name,
        colour: dto.colour,
      });
      await category.save({ transaction: undefined });
      return category;
    },
  },
  updateCategory: {
    type: GraphQLNonNull(CategoryNodeGql),
    args: { dto: { type: GraphQLNonNull(UpdateCategoryGqlInput), }, },
    resolve: async (parent, args, ctx): Promise<ICategoryNodeGqlSource> => {
      const dto = assertValid(UpdateCategoryGqlInputValidator, args.dto);
      const category = await Category.findByPk(dto.id);
      if (!category) throw new Error('todo...');
      if (dto.name !== undefined) category.name = dto.name;
      if (dto.colour !== undefined) category.colour = dto.colour;
      await category.save({ transaction: undefined });
      return category;
    },
  },
});