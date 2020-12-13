import { Thunk, GraphQLFieldConfigMap, GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import Joi from "joi";
import { GqlContext } from "../common/contexts/gql-context";
import { assertValid } from "../common/helpers/assert-valid.fn";
import { ProductDefinition } from "./product.definition";
import { ProductNodeGql, IProductNodeGqlSource } from "./product.gql.node";
import { Product } from "./product.model";

/**
 * Create Product
 */

interface ICreateProductGqlInput {
  name: string;
  cost: number;
  price: number;
  category_id: number;
}

const CreateProductGqlInputValidator = Joi.object<ICreateProductGqlInput>({
  name: Joi.string().min(ProductDefinition.name.min).max(ProductDefinition.name.max).required(),
  cost: Joi.number().required(),
  price: Joi.number().required(),
  category_id: Joi.number().required(),
});

const CreateProductGqlInput = new GraphQLInputObjectType({
  name: 'CreateProduct',
  fields: {
    name: { type: GraphQLNonNull(GraphQLString), },
    cost: { type: GraphQLNonNull(GraphQLFloat), },
    price: { type: GraphQLNonNull(GraphQLFloat), },
    category_id: { type: GraphQLNonNull(GraphQLFloat), },
  },
});

/**
 * Update Product
 */

interface IUpdateProductGqlInput {
  id?: number;
  name?: string;
  cost?: number;
  price?: number;
  category_id?: number;
}

const UpdateProductGqlInputValidator = Joi.object<IUpdateProductGqlInput>({
  id: Joi.number().required(),
  name: Joi.string().min(ProductDefinition.name.min).max(ProductDefinition.name.max).optional(),
  cost: Joi.number().optional(),
  price: Joi.number().optional(),
  category_id: Joi.number().optional(),
});

const UpdateProductGqlInput = new GraphQLInputObjectType({
  name: 'UpdateProduct',
  fields: {
    id: { type: GraphQLFloat, },
    name: { type: GraphQLString, },
    cost: { type: GraphQLFloat, },
    price: { type: GraphQLFloat, },
    category_id: { type: GraphQLFloat, },
  },
});


/**
 * Mutation Fields
 */
export const ProductGqlMutation: Thunk<GraphQLFieldConfigMap<unknown, GqlContext>> = () => ({
  createProduct: {
    type: GraphQLNonNull(ProductNodeGql),
    args: { dto: { type: GraphQLNonNull(CreateProductGqlInput), }, },
    resolve: async (parent, args, ctx): Promise<IProductNodeGqlSource> => {
      const dto = assertValid(CreateProductGqlInputValidator, args.dto);
      const product = Product.build({
        name: dto.name,
        cost: dto.cost,
        category_id: dto.category_id,
        price: dto.price,
      });
      await product.save({ transaction: undefined });
      return product;
    },
  },
  updateProduct: {
    type: GraphQLNonNull(ProductNodeGql),
    args: { dto: { type: GraphQLNonNull(UpdateProductGqlInput), }, },
    resolve: async (parent, args, ctx): Promise<IProductNodeGqlSource> => {
      const dto = assertValid(UpdateProductGqlInputValidator, args.dto);
      const product = await Product.findByPk(dto.id);
      if (!product) throw new Error('todo...');
      if (dto.name !== undefined) product.name = dto.name;
      if (dto.cost !== undefined) product.cost = dto.cost;
      if (dto.price !== undefined) product.price = dto.price;
      if (dto.category_id !== undefined) product.category_id = dto.category_id;
      await product.save({ transaction: undefined });
      return product;
    },
  },
});