import * as bundled from './bundled'
import { CodingOptions, defaultCodingOptions } from './shared'

export const Type = {
  setDefaultCodingOptions(options: CodingOptions) {
    Object.assign(defaultCodingOptions, options)
  },
  configured: bundled.ConfiguredTranscoder,
  undefined: bundled.UndefinedCoder,
  null: bundled.NullCoder,
  boolean: bundled.BooleanCoder,
  number: bundled.NumberCoder,
  string: bundled.StringCoder,
  list: bundled.ListTranscoder,
  struct: bundled.StructureTranscoder,
  anyOf: bundled.UnionTranscoder,
  optional: bundled.OptionalTranscoder,
  nullable: bundled.NullableTranscoder,
  any: bundled.AnyCoder,
  literal: bundled.LiteralCoder,
  integer: bundled.IntegerCoder,
  dateTime: bundled.DateTimeTranscoder,
  record: bundled.RecordTranscoder,
  tuple: bundled.TupleTranscoder,
}
