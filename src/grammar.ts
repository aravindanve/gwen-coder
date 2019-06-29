import * as bundled from './bundled'

export const Type = {
  undefined: bundled.UndefinedCoder,
  null: bundled.NullCoder,
  boolean: bundled.BooleanCoder,
  number: bundled.NumberCoder,
  // integer: bundled.IntegerCoder,
  string: bundled.StringCoder,
  // date: bundled.DateTranscoder,
  array: bundled.ArrayTranscoder,
  // tuple: bundled.TupleCoder,
  object: bundled.ObjectTranscoder,
  // buffer: bundled.BufferCoder,
  anyOf: bundled.UnionTranscoder,
  allOf: bundled.IntersectionTranscoder,
}
