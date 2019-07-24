import { expect } from 'chai'
import { StringCoder } from './StringCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('StringCoder', () => {
  it('can be initialized', () => {
    StringCoder()
  })
  it('asserts type on assert()', () => {
    const coder = StringCoder()

    expect(coder.assert('hello')).to.eq('hello')
    expect(() => coder.assert(undefined as any)).to.throw(AssertionError)
    expect(() => coder.assert(null as any)).to.throw(AssertionError)
    expect(() => coder.assert(true as any)).to.throw(AssertionError)
    expect(() => coder.assert(42 as any)).to.throw(AssertionError)
    expect(() => coder.assert([] as any)).to.throw(AssertionError)
    expect(() => coder.assert({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = StringCoder()

    expect(coder.decode('hello')).to.eq('hello')
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(42 as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = StringCoder()

    expect(coder.decode('hello', { coerceOnDecode: true })).to.eq('hello')
    expect(coder.decode(42 as any, { coerceOnDecode: true })).to.eq('42')
    expect(coder.decode(true as any, { coerceOnDecode: true })).to.eq('true')
    expect(() => coder.decode(undefined as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode(null as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode([] as any, { coerceOnDecode: true })).to.throw(DecodingError)
    expect(() => coder.decode({} as any, { coerceOnDecode: true })).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = StringCoder()

    expect(coder.encode('hello')).to.eq('hello')
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode(42 as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
