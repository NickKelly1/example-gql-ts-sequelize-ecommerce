import { GraphQLObjectType, GraphQLNonNull, GraphQLFloat, GraphQLBoolean } from "graphql";
import { GqlContext } from "../contexts/gql-context";

export interface IPaginationGqlSource {
  limit: number;
  offset: number;
  total: number;
  page_number: number;
  pages: number;
  more: boolean;
}
export const PaginationGqlField: {[K in keyof IPaginationGqlSource]: K} = {
  limit: 'limit',
  more: 'more',
  offset: 'offset',
  page_number: 'page_number',
  pages: 'pages',
  total: 'total',
}
export const PaginationGql = new GraphQLObjectType<IPaginationGqlSource, GqlContext>({
  name: 'Pagination',
  fields: {
    [PaginationGqlField.limit]: { type: GraphQLNonNull(GraphQLFloat), resolve: (parent): number => parent[PaginationGqlField.limit] },
    [PaginationGqlField.offset]: { type: GraphQLNonNull(GraphQLFloat), resolve: (parent): number => parent[PaginationGqlField.offset] },
    [PaginationGqlField.total]: { type: GraphQLNonNull(GraphQLFloat), resolve: (parent): number => parent[PaginationGqlField.total] },
    [PaginationGqlField.page_number]: { type: GraphQLNonNull(GraphQLFloat), resolve: (parent): number => parent[PaginationGqlField.page_number] },
    [PaginationGqlField.pages]: { type: GraphQLNonNull(GraphQLFloat), resolve: (parent): number => parent[PaginationGqlField.pages] },
    [PaginationGqlField.more]: { type: GraphQLNonNull(GraphQLBoolean), resolve: (parent): boolean => parent[PaginationGqlField.more] },
  },
});