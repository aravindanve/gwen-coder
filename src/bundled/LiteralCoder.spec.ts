import { expect } from 'chai'
import { LiteralCoder } from './LiteralCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('LiteralCoder', () => {
  it('can be initialized', () => {
    LiteralCoder(1)
    LiteralCoder('')
  })
  it('asserts type on assert()', () => {
    expect(LiteralCoder(null).assert(null)).to.eq(null)
    expect(LiteralCoder(true).assert(true)).to.eq(true)
    expect(LiteralCoder(42).assert(42)).to.eq(42)
    expect(LiteralCoder('literal').assert('literal')).to.eq('literal')

    const coder = LiteralCoder('literal')

    expect(() => coder.assert(undefined as any)).to.throw(AssertionError)
    expect(() => coder.assert(null as any)).to.throw(AssertionError)
    expect(() => coder.assert(true as any)).to.throw(AssertionError)
    expect(() => coder.assert(false as any)).to.throw(AssertionError)
    expect(() => coder.assert(0 as any)).to.throw(AssertionError)
    expect(() => coder.assert('0' as any)).to.throw(AssertionError)
    expect(() => coder.assert([] as any)).to.throw(AssertionError)
    expect(() => coder.assert({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    expect(LiteralCoder(null).decode(null)).to.eq(null)
    expect(LiteralCoder(true).decode(true)).to.eq(true)
    expect(LiteralCoder(42).decode(42)).to.eq(42)
    expect(LiteralCoder('literal').decode('literal')).to.eq('literal')

    const coder = LiteralCoder('literal')

    expect(coder.decode('literal')).to.eq('literal')
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(false as any)).to.throw(DecodingError)
    expect(() => coder.decode(0 as any)).to.throw(DecodingError)
    expect(() => coder.decode('0' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    expect(LiteralCoder(null).encode(null)).to.eq(null)
    expect(LiteralCoder(true).encode(true)).to.eq(true)
    expect(LiteralCoder(42).encode(42)).to.eq(42)
    expect(LiteralCoder('literal').encode('literal')).to.eq('literal')

    const coder = LiteralCoder('literal')

    expect(coder.encode('literal')).to.eq('literal')
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode(false as any)).to.throw(EncodingError)
    expect(() => coder.encode(0 as any)).to.throw(EncodingError)
    expect(() => coder.encode('0' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
