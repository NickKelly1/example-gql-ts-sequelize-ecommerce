import { Thunk, GraphQLFieldConfigMap, GraphQLNonNull } from "graphql";
import { GqlContext } from "../common/contexts/gql-context";
import { IPaginationGqlSource } from "../common/gql/pagination.gql";
import { ProductCollectionGql, IProductCollectionGqlSource } from "./product.gql.node";

export const ProductGqlQuery: Thunk<GraphQLFieldConfigMap<unknown, GqlContext>> = () => ({
  /**
   * Products
   */
  products: {
    type: GraphQLNonNull(ProductCollectionGql),
    resolve: async (parent, args, ctx): Promise<IProductCollectionGqlSource> => {
      const pagination: IPaginationGqlSource = { limit: 5, offset: 0, more: false, page_number: 1, pages: 0, total: 10, };
      const final = await ctx.services.productRepository.findAllAndCount({
        runner: null,
        options: {
          limit: pagination.limit,
          offset: pagination.offset,
        },
      });
      return {
        nodes: final.rows,
        pagination,
      };
    },
  },
});