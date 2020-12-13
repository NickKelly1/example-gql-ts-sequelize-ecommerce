import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLString } from "graphql";
import { GqlContext } from "../contexts/gql-context";
import { ICheck } from "../helpers/check";

export type IActionGqlSource = ICheck;
export const ActionGql = new GraphQLObjectType<IActionGqlSource, GqlContext>({
  name: 'Action',
  fields: () => ({
    can: { type: GraphQLNonNull(GraphQLBoolean), resolve: (parent): boolean => parent.can, },
    reason: { type: GraphQLString, resolve: (parent): (null | string) => parent.reason ?? null, },
  }),
});
