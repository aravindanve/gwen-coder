import { expect } from 'chai'
import { IntegerCoder } from './IntegerCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('IntegerCoder', () => {
  it('can be initialized', () => {
    IntegerCoder()
  })
  it('asserts type on assert()', () => {
    const coder = IntegerCoder()

    expect(coder.assert(42)).to.eq(42)
    expect(() => coder.assert(42.5)).to.throw(AssertionError)
    expect(() => coder.assert(NaN)).to.throw(AssertionError)
    expect(() => coder.assert(undefined as any)).to.throw(AssertionError)
    expect(() => coder.assert(null as any)).to.throw(AssertionError)
    expect(() => coder.assert(true as any)).to.throw(AssertionError)
    expect(() => coder.assert('42' as any)).to.throw(AssertionError)
    expect(() => coder.assert([] as any)).to.throw(AssertionError)
    expect(() => coder.assert({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = IntegerCoder()

    expect(coder.decode(42)).to.eq(42)
    expect(() => coder.decode(42.5)).to.throw(DecodingError)
    expect(() => coder.decode(NaN)).to.throw(DecodingError)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode('42' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = IntegerCoder()

    expect(coder.decode(42, { coerceOnDecode: true })).to.eq(42)
    expect(coder.decode('42' as any, { coerceOnDecode: true })).to.eq(42)
    expect(coder.decode(false as any, { coerceOnDecode: true })).to.eq(0)
    expect(coder.decode(true as any, { coerceOnDecode: true })).to.eq(1)
    expect(() => coder.decode(42.5, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode('42.5' as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(NaN, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(undefined as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(null as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode('hello' as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode([] as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode({} as any, { coerceOnDecode: true })).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = IntegerCoder()

    expect(coder.encode(42)).to.eq(42)
    expect(() => coder.encode(42.5)).to.throw(EncodingError)
    expect(() => coder.encode(NaN)).to.throw(EncodingError)
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode('42' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
