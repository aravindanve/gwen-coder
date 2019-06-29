import { expect } from 'chai'
import { UndefinedCoder } from './UndefinedCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('UndefinedCoder', () => {
  it('can be initialized', () => {
    UndefinedCoder()
  })
  it('asserts type on pipe()', () => {
    const coder = UndefinedCoder()

    expect(coder.pipe(undefined)).to.eq(undefined)
    expect(() => coder.pipe(null as any)).to.throw(AssertionError)
    expect(() => coder.pipe(true as any)).to.throw(AssertionError)
    expect(() => coder.pipe(false as any)).to.throw(AssertionError)
    expect(() => coder.pipe(0 as any)).to.throw(AssertionError)
    expect(() => coder.pipe('0' as any)).to.throw(AssertionError)
    expect(() => coder.pipe([] as any)).to.throw(AssertionError)
    expect(() => coder.pipe({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = UndefinedCoder()

    expect(coder.decode(undefined)).to.eq(undefined)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(false as any)).to.throw(DecodingError)
    expect(() => coder.decode(0 as any)).to.throw(DecodingError)
    expect(() => coder.decode('0' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = UndefinedCoder()

    expect(coder.encode(undefined)).to.eq(undefined)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode(false as any)).to.throw(EncodingError)
    expect(() => coder.encode(0 as any)).to.throw(EncodingError)
    expect(() => coder.encode('0' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
