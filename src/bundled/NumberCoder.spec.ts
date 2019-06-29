import { expect } from 'chai'
import { NumberCoder } from './NumberCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('NumberCoder', () => {
  it('can be initialized', () => {
    NumberCoder()
    NumberCoder({})
    NumberCoder({ coerceOnDecode: true })
  })
  it('asserts type on pipe()', () => {
    const coder = NumberCoder()

    expect(coder.pipe(42)).to.eq(42)
    expect(() => coder.pipe(undefined as any)).to.throw(AssertionError)
    expect(() => coder.pipe(null as any)).to.throw(AssertionError)
    expect(() => coder.pipe(true as any)).to.throw(AssertionError)
    expect(() => coder.pipe('42' as any)).to.throw(AssertionError)
    expect(() => coder.pipe([] as any)).to.throw(AssertionError)
    expect(() => coder.pipe({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = NumberCoder()

    expect(coder.decode(42)).to.eq(42)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode('42' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = NumberCoder({ coerceOnDecode: true })

    expect(coder.decode(42)).to.eq(42)
    expect(coder.decode('42' as any)).to.eq(42)
    expect(coder.decode(false as any)).to.eq(0)
    expect(coder.decode(true as any)).to.eq(1)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode('hello' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = NumberCoder()

    expect(coder.encode(42)).to.eq(42)
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode('42' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
