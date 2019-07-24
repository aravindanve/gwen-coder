import { expect } from 'chai'
import { NumberCoder } from './NumberCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { NullableTranscoder } from './NullableTranscoder'

describe('NumberCoder', () => {
  it('can be initialized', () => {
    NullableTranscoder(NumberCoder())
  })
  it('asserts type on assert()', () => {
    const coder = NullableTranscoder(NumberCoder())

    expect(coder.assert(42)).to.eq(42)
    expect(coder.assert(null)).to.eq(null)
    expect(() => coder.assert(NaN)).to.throw(AssertionError)
    expect(() => coder.assert(undefined as any)).to.throw(AssertionError)
    expect(() => coder.assert(true as any)).to.throw(AssertionError)
    expect(() => coder.assert('42' as any)).to.throw(AssertionError)
    expect(() => coder.assert([] as any)).to.throw(AssertionError)
    expect(() => coder.assert({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = NullableTranscoder(NumberCoder())

    expect(coder.decode(42)).to.eq(42)
    expect(coder.decode(null)).to.eq(null)
    expect(() => coder.decode(NaN)).to.throw(DecodingError)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode('42' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = NullableTranscoder(NumberCoder())

    expect(coder.decode(42, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.eq(42)
    expect(coder.decode('42' as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.eq(42)
    expect(coder.decode(false as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.eq(0)
    expect(coder.decode(true as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.eq(1)
    expect(coder.decode(null, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.eq(null)
    expect(coder.decode('NULL' as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.eq(null)
    expect(() => coder.decode(NaN, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(undefined as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode('hello' as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode([] as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode({} as any, { coerceOnDecode: true, coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = NullableTranscoder(NumberCoder())

    expect(coder.encode(42)).to.eq(42)
    expect(coder.encode(null as any)).to.eq(null)
    expect(() => coder.encode(NaN)).to.throw(EncodingError)
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode('42' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
