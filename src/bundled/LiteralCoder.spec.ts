import { expect } from 'chai'
import { LiteralCoder } from './LiteralCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('LiteralCoder', () => {
  it('can be initialized', () => {
    LiteralCoder(1)
    LiteralCoder('')
  })
  it('asserts type on pipe()', () => {
    expect(LiteralCoder(null).pipe(null)).to.eq(null)
    expect(LiteralCoder(true).pipe(true)).to.eq(true)
    expect(LiteralCoder(42).pipe(42)).to.eq(42)
    expect(LiteralCoder('literal').pipe('literal')).to.eq('literal')

    const coder = LiteralCoder('literal')

    expect(() => coder.pipe(undefined as any)).to.throw(AssertionError)
    expect(() => coder.pipe(null as any)).to.throw(AssertionError)
    expect(() => coder.pipe(true as any)).to.throw(AssertionError)
    expect(() => coder.pipe(false as any)).to.throw(AssertionError)
    expect(() => coder.pipe(0 as any)).to.throw(AssertionError)
    expect(() => coder.pipe('0' as any)).to.throw(AssertionError)
    expect(() => coder.pipe([] as any)).to.throw(AssertionError)
    expect(() => coder.pipe({} as any)).to.throw(AssertionError)
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
