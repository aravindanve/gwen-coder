import { expect } from 'chai'
import { NullCoder } from './NullCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('NullCoder', () => {
  it('can be initialized', () => {
    NullCoder()
  })
  it('asserts type on pipe()', () => {
    const coder = NullCoder()

    expect(coder.pipe(null)).to.eq(null)
    expect(() => coder.pipe(undefined as any)).to.throw(AssertionError)
    expect(() => coder.pipe(true as any)).to.throw(AssertionError)
    expect(() => coder.pipe(false as any)).to.throw(AssertionError)
    expect(() => coder.pipe(0 as any)).to.throw(AssertionError)
    expect(() => coder.pipe('0' as any)).to.throw(AssertionError)
    expect(() => coder.pipe([] as any)).to.throw(AssertionError)
    expect(() => coder.pipe({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = NullCoder()

    expect(coder.decode(null)).to.eq(null)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(false as any)).to.throw(DecodingError)
    expect(() => coder.decode(0 as any)).to.throw(DecodingError)
    expect(() => coder.decode('0' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = NullCoder()

    expect(coder.decode(null, { coerceNullFromStringOnDecode: true })).to.eq(null)
    expect(coder.decode('null' as any, { coerceNullFromStringOnDecode: true })).to.eq(null)
    expect(coder.decode('NULL' as any, { coerceNullFromStringOnDecode: true })).to.eq(null)
    expect(() => coder.decode(undefined as any, { coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(true as any, { coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(false as any, { coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(0 as any, { coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode('0' as any, { coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode([] as any, { coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode({} as any, { coerceNullFromStringOnDecode: true })).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = NullCoder()

    expect(coder.encode(null)).to.eq(null)
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode(false as any)).to.throw(EncodingError)
    expect(() => coder.encode(0 as any)).to.throw(EncodingError)
    expect(() => coder.encode('0' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
