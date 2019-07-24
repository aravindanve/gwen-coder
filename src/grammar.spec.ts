import { expect } from 'chai'
import { Type } from './grammar'
import { NullCoder, ConfiguredTranscoder, UndefinedCoder, BooleanCoder, NumberCoder, StringCoder, ListTranscoder, StructureTranscoder, UnionTranscoder, OptionalTranscoder, NullableTranscoder, AnyCoder, LiteralCoder, IntegerCoder, DateTimeTranscoder, RecordTranscoder, TupleTranscoder } from './bundled'
import { defaultCodingOptions } from './defaults'

describe('Type', () => {
  it('exposes factories', () => {
    expect(Type.configured).to.eq(ConfiguredTranscoder)
    expect(Type.undefined).to.eq(UndefinedCoder)
    expect(Type.null).to.eq(NullCoder)
    expect(Type.boolean).to.eq(BooleanCoder)
    expect(Type.number).to.eq(NumberCoder)
    expect(Type.string).to.eq(StringCoder)
    expect(Type.list).to.eq(ListTranscoder)
    expect(Type.struct).to.eq(StructureTranscoder)
    expect(Type.anyOf).to.eq(UnionTranscoder)
    expect(Type.optional).to.eq(OptionalTranscoder)
    expect(Type.nullable).to.eq(NullableTranscoder)
    expect(Type.any).to.eq(AnyCoder)
    expect(Type.literal).to.eq(LiteralCoder)
    expect(Type.integer).to.eq(IntegerCoder)
    expect(Type.dateTime).to.eq(DateTimeTranscoder)
    expect(Type.record).to.eq(RecordTranscoder)
    expect(Type.tuple).to.eq(TupleTranscoder)
  })
  it('sets default coding options', () => {
    Type.setDefaultCodingOptions({ coerceOnDecode: true })
    expect(defaultCodingOptions.coerceOnDecode).to.eq(true)
    Type.setDefaultCodingOptions({ coerceOnDecode: false })
    expect(defaultCodingOptions.coerceOnDecode).to.eq(false)
  })
})
