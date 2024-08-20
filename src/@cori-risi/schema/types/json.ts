import { GraphQLScalarType as ScalarType } from "graphql/type/definition";
import { parse, stringify } from "flatted";

export function coerceObject (value: any) {
  try {
    return parse(value);
  } catch (err) {
    return value;
  }
}

export function parseObject (valueAST: any) {
  return stringify(valueAST.value);
}

export const JSONObject = new ScalarType({
  name: 'JSONObject',
  description: 'Arbitrary JSON value',
  serialize: coerceObject,
  parseValue: coerceObject,
  parseLiteral: parseObject,
});
