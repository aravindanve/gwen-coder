import { expect } from 'chai'
import { BooleanCoder } from './BooleanCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('BooleanCoder', () => {
  it('can be initialized', () => {
    BooleanCoder()
  })
  it('asserts type on assert()', () => {
    const coder = BooleanCoder()

    expect(coder.assert(true)).to.eq(true)
    expect(coder.assert(false)).to.eq(false)
    expect(() => coder.assert(undefined as any)).to.throw(AssertionError)
    expect(() => coder.assert(null as any)).to.throw(AssertionError)
    expect(() => coder.assert(0 as any)).to.throw(AssertionError)
    expect(() => coder.assert('0' as any)).to.throw(AssertionError)
    expect(() => coder.assert([] as any)).to.throw(AssertionError)
    expect(() => coder.assert({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = BooleanCoder()

    expect(coder.decode(true)).to.eq(true)
    expect(coder.decode(false)).to.eq(false)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(0 as any)).to.throw(DecodingError)
    expect(() => coder.decode('0' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = BooleanCoder()

    expect(coder.decode(true, { coerceOnDecode: true })).to.eq(true)
    expect(coder.decode(false, { coerceOnDecode: true })).to.eq(false)
    expect(coder.decode(0 as any, { coerceOnDecode: true })).to.eq(false)
    expect(coder.decode('0' as any, { coerceOnDecode: true })).to.eq(false)
    expect(coder.decode('false' as any, { coerceOnDecode: true })).to.eq(false)
    expect(coder.decode('FALSE' as any, { coerceOnDecode: true })).to.eq(false)
    expect(coder.decode(1 as any, { coerceOnDecode: true })).to.eq(true)
    expect(coder.decode('1' as any, { coerceOnDecode: true })).to.eq(true)
    expect(coder.decode('true' as any, { coerceOnDecode: true })).to.eq(true)
    expect(coder.decode('TRUE' as any, { coerceOnDecode: true })).to.eq(true)
    expect(() => coder.decode(undefined as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(null as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(-1 as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode('42' as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode([] as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode({} as any, { coerceOnDecode: true })).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = BooleanCoder()

    expect(coder.encode(true)).to.eq(true)
    expect(coder.encode(false)).to.eq(false)
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(0 as any)).to.throw(EncodingError)
    expect(() => coder.encode('0' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
