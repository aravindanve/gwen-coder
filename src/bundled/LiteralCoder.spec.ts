import { expect } from 'chai'
import { LiteralCoder } from './LiteralCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('LiteralCoder', () => {
  it('can be initialized', () => {
    LiteralCoder(1)
    LiteralCoder('')
  })
  it('asserts type on assert()', async () => {
    await expect(LiteralCoder(null).assert(null)).to.eventually.eq(null)
    await expect(LiteralCoder(true).assert(true)).to.eventually.eq(true)
    await expect(LiteralCoder(42).assert(42)).to.eventually.eq(42)
    await expect(LiteralCoder('literal').assert('literal')).to.eventually.eq('literal')

    const coder = LiteralCoder('literal')

    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(false as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(0 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('0' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    await expect(LiteralCoder(null).decode(null)).to.eventually.eq(null)
    await expect(LiteralCoder(true).decode(true)).to.eventually.eq(true)
    await expect(LiteralCoder(42).decode(42)).to.eventually.eq(42)
    await expect(LiteralCoder('literal').decode('literal')).to.eventually.eq('literal')

    const coder = LiteralCoder('literal')

    await expect(coder.decode('literal')).to.eventually.eq('literal')
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(false as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(0 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('0' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    await expect(LiteralCoder(null).encode(null)).to.eventually.eq(null)
    await expect(LiteralCoder(true).encode(true)).to.eventually.eq(true)
    await expect(LiteralCoder(42).encode(42)).to.eventually.eq(42)
    await expect(LiteralCoder('literal').encode('literal')).to.eventually.eq('literal')

    const coder = LiteralCoder('literal')

    await expect(coder.encode('literal')).to.eventually.eq('literal')
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(false as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(0 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('0' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
