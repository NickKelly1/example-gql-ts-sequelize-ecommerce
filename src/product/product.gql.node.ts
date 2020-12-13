import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLFloat, GraphQLString } from "graphql";
import { GqlDateTimeScalar } from "../common/gql/date-time-scalar.gql";
import { ActionGql } from "../common/gql/action.gql";
import { IPaginationGqlSource, PaginationGql } from '../common/gql/pagination.gql';
import { Product } from "./product.model";
import { GqlContext } from "../common/contexts/gql-context";

export type IProductNodeGqlSource = Product
export const ProductNodeGql = new GraphQLObjectType<IProductNodeGqlSource, GqlContext>({
  name: 'ProductNode',
  fields: () => ({
    // data
    data: {
      resolve: (parent): IProductNodeGqlSource => parent,
      type: GraphQLNonNull(new GraphQLObjectType<IProductNodeGqlSource, GqlContext>({
        name: 'ProductData',
        fields: {
          id: { type: GraphQLNonNull(GraphQLFloat), },
          name: { type: GraphQLNonNull(GraphQLString), },
          cost: { type: GraphQLNonNull(GraphQLFloat), },
          price: { type: GraphQLNonNull(GraphQLFloat), },
          created_at: { type: GraphQLNonNull(GqlDateTimeScalar), },
          updated_at: { type: GraphQLNonNull(GqlDateTimeScalar), },
        },
      })),
    },

    // actions
    can: {
      resolve: (parent): IProductNodeGqlSource => parent,
      type: GraphQLNonNull(new GraphQLObjectType<IProductNodeGqlSource, GqlContext>({
        name: 'ProductActions',
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
        },
      })),
    },
  }),
});

export interface IProductCollectionGqlSource { nodes: Product[]; pagination: IPaginationGqlSource; }
export const ProductCollectionGql = new GraphQLObjectType<IProductCollectionGqlSource, GqlContext>({
  name: 'ProductCollection',
  fields: () => ({
    nodes: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(ProductNodeGql))),
      resolve: (parent) => parent.nodes,
    },
    pagination: { type: GraphQLNonNull(PaginationGql), resolve: (parent): IPaginationGqlSource => parent.pagination, },
  }),
});