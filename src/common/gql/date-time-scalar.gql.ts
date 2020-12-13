import { GraphQLScalarType, Kind } from "graphql";
import { isValidDate } from "../helpers/is-valid-date.fn";

export const GqlDateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO formatted date-time string at UTC. For example: 2020-12-03T11:16:31Z.',

  /**
   * Serializes an internal value to include in a response.
   */
  serialize(value): string {
    if (value instanceof Date) {
      if (!isValidDate(value)) throw new TypeError(`Failed to serialize DateTime. Invalid value: ${String(value)}`);
      return value.toISOString();
    }
    if (typeof value === 'number' || value instanceof Number) {
      const date = new Date(value as number);
      if (!isValidDate(date)) throw new TypeError(`Failed to serialize DateTime. Invalid value: ${String(value)}`);
      return date.toISOString();
    }
    if (typeof value === 'string' || value instanceof String) {
      const date = new Date(value as string);
      if (!isValidDate(date)) throw new TypeError(`Failed to serialize DateTime. Invalid value: ${String(value)}`);
      return date.toISOString();
    }
    throw new TypeError(`Failed to serialize DateTime. Invalid type: ${typeof value}`);
  },

  /**
   * Parses an externally provided value to use as an input.
   */
  parseValue(value) {
    if (typeof value === 'string' || value instanceof String) {
      const date = new Date(value as string);
      if (!isValidDate(date)) throw new TypeError(`Failed to parse DateTime value. Invalid value: ${String(value)}`);
      return date;
    }
    if (typeof value === 'number' || value instanceof Number) {
      const date = new Date(value as number);
      if (!isValidDate(date)) throw new TypeError(`Failed to parse DateTime value. Invalid value: ${String(value)}`);
      return date;
    }
    throw new TypeError(`Failed to parse DateTime value. Invalid type: ${typeof value}`);
  },

  /**
   * Parses an externally provided literal value to use as an input.
   */
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING: {
        const date = new Date(ast.value);
        if (!isValidDate(date)) throw new Error(`Failed to parse DateTime literal. Invalid value: ${String(ast.value)}`);
        return date;
      }
      case Kind.INT:
      case Kind.FLOAT: {
        const date = new Date(ast.value);
        if (!isValidDate(date)) throw new Error(`Failed to parse DateTime literal. Invalid value: ${String(ast.value)}`);
        return date;
      }
      default: {
        throw new Error(`Failed to parse DateTime literal. Invalid kind: ${ast.kind}, "${(ast as any).value}".`);
      }
    }
  }
});
