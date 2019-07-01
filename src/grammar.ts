import * as bundled from './bundled'

export const Type = {
  undefined: bundled.UndefinedCoder,
  null: bundled.NullCoder,
  boolean: bundled.BooleanCoder,
  number: bundled.NumberCoder,
  string: bundled.StringCoder,
  array: bundled.ArrayTranscoder,
  struct: bundled.StructureTranscoder,
  anyOf: bundled.UnionTranscoder,
  optional: bundled.OptionalTranscoder,
  nullable: bundled.NullableTranscoder,
  // // TODO:
  // integer: bundled.IntegerCoder,
  // any: bundled.AnyCoder,
  // literal: bundled.LiteralCoder,
  // date: bundled.DateTranscoder,
  // record: bundled.RecordTranscoder,
  // tuple: bundled.TupleCoder,
  // buffer: bundled.BufferCoder,
}
