import { GraphQLObjectType, GraphQLNonNull, GraphQLFloat, GraphQLString, GraphQLList } from "graphql";
import { GqlDateTimeScalar } from "../common/gql/date-time-scalar.gql";
import { ActionGql, IActionGqlSource } from "../common/gql/action.gql";
import { ProductCollectionGql } from "../product/product.gql.node";
import { Category } from "./category.model";
import { PaginationGql, IPaginationGqlSource } from "../common/gql/pagination.gql";
import { GqlContext } from "../common/contexts/gql-context";

export type ICategoryNodeGqlSource = Category;
export const CategoryNodeGql = new GraphQLObjectType<ICategoryNodeGqlSource, GqlContext>({
  name: 'CategoryNode',
  fields: () => ({
    // data
    data: {
      resolve: (parent): ICategoryNodeGqlSource => parent,
      type: GraphQLNonNull(new GraphQLObjectType<ICategoryNodeGqlSource, GqlContext>({
        name: 'CategoryData',
        fields: {
          id: { type: GraphQLNonNull(GraphQLFloat), },
          name: { type: GraphQLNonNull(GraphQLString), },
          colour: { type: GraphQLNonNull(GraphQLString), },
          created_at: { type: GraphQLNonNull(GqlDateTimeScalar), },
          updated_at: { type: GraphQLNonNull(GqlDateTimeScalar), },
        },
      })),
    },

    // Actions
    can: {
      resolve: (parent): ICategoryNodeGqlSource => parent,
      type: GraphQLNonNull(new GraphQLObjectType<ICategoryNodeGqlSource, GqlContext>({
        name: 'CategoryActions',
        fields: {
          show: {
            type: GraphQLNonNull(ActionGql),
            resolve: (parent, args, ctx): boolean => {
              return true;
            },
          },
          update: {
            type: GraphQLNonNull(ActionGql),
            resolve: (parent, args, ctx): boolean => {
              return true;
            },
          },
          softDelete: {
            type: GraphQLNonNull(ActionGql),
            resolve: (parent, args, ctx): boolean => {
              return true;
            },
          }
        }
      })),
    },

    // relations
    relations: {
      resolve: (parent): ICategoryNodeGqlSource => parent,
      type: GraphQLNonNull(new GraphQLObjectType<ICategoryNodeGqlSource, GqlContext>({
        name: 'CategoryRelations',
        fields: () => ({
          products: {
            type: GraphQLNonNull(ProductCollectionGql),
            resolve: (parent, ctx, args) => {
              //
            },
          },
        }),
      })),
    }
  }),
});

export interface ICategoryCollectionGqlSource { nodes: Category[]; pagination: IPaginationGqlSource; }
export const CategoryCollectionGql = new GraphQLObjectType<ICategoryCollectionGqlSource, GqlContext>({
  name: 'CategoryCollection',
  fields: () => ({
    nodes: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(CategoryNodeGql))),
      resolve: (parent) => parent.nodes,
    },
    pagination: { type: GraphQLNonNull(PaginationGql), resolve: (parent): IPaginationGqlSource => parent.pagination, },
  }),
});