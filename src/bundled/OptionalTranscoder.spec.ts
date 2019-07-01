import { expect } from 'chai'
import { StringCoder } from './StringCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { OptionalTranscoder } from './OptionalTranscoder'

describe('StringCoder', () => {
  it('can be initialized', () => {
    OptionalTranscoder(StringCoder())
    OptionalTranscoder(StringCoder({}))
    OptionalTranscoder(StringCoder({ coerceOnDecode: true }))
  })
  it('asserts type on pipe()', () => {
    const coder = OptionalTranscoder(StringCoder())

    expect(coder.pipe('hello')).to.eq('hello')
    expect(coder.pipe(undefined)).to.eq(undefined)
    expect(() => coder.pipe(null as any)).to.throw(AssertionError)
    expect(() => coder.pipe(true as any)).to.throw(AssertionError)
    expect(() => coder.pipe(42 as any)).to.throw(AssertionError)
    expect(() => coder.pipe([] as any)).to.throw(AssertionError)
    expect(() => coder.pipe({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = OptionalTranscoder(StringCoder())

    expect(coder.decode('hello')).to.eq('hello')
    expect(coder.decode(undefined)).to.eq(undefined)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(42 as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = OptionalTranscoder(StringCoder({ coerceOnDecode: true }))

    expect(coder.decode('hello')).to.eq('hello')
    expect(coder.decode(42 as any)).to.eq('42')
    expect(coder.decode(true as any)).to.eq('true')
    expect(coder.decode(undefined)).to.eq(undefined)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = OptionalTranscoder(StringCoder())

    expect(coder.encode('hello')).to.eq('hello')
    expect(coder.encode(undefined)).to.eq(undefined)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode(42 as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
