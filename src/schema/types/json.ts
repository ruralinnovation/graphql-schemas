import { GraphQLScalarType as ScalarType } from "graphql/type/definition";

function coerceObject (value: any) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

function parseObject (valueAST: any) {
  return JSON.stringify(valueAST.value);
}

export const JSONObject = new ScalarType({
  name: 'JSONObject',
  description: 'Arbitrary JSON value',
  serialize: coerceObject,
  parseValue: coerceObject,
  parseLiteral: parseObject,
});
