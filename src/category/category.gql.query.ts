import { Thunk, GraphQLFieldConfigMap, GraphQLNonNull } from "graphql";
import { GqlContext } from "../common/contexts/gql-context";
import { IPaginationGqlSource } from "../common/gql/pagination.gql";
import { CategoryCollectionGql, ICategoryCollectionGqlSource } from "./category.gql.node";

export const CategoryGqlQuery: Thunk<GraphQLFieldConfigMap<unknown, GqlContext>> = () => ({
  /**
   * Categories
   */
  categories: {
    type: GraphQLNonNull(CategoryCollectionGql),
    resolve: async (parent, args, ctx): Promise<ICategoryCollectionGqlSource> => {
      const pagination: IPaginationGqlSource = { limit: 5, offset: 0, more: false, page_number: 1, pages: 0, total: 10, };
      const final = await ctx.services.categoryRepository.findAllAndCount({
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