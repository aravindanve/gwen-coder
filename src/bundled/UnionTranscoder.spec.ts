import { expect } from 'chai'
import { UnionTranscoder } from './UnionTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { StringCoder } from './StringCoder'
import { NullCoder } from './NullCoder'

describe('UnionTranscoder', () => {
  it('can be initialized', () => {
    UnionTranscoder(StringCoder(), NullCoder())
    expect(() => (UnionTranscoder as any)()).to.throw(TypeError)
  })
  it('asserts type on assert()', async () => {
    const coder = UnionTranscoder(StringCoder(), NullCoder())

    await expect(coder.assert('hello')).to.eventually.eq('hello')
    await expect(coder.assert(null)).to.eventually.eq(null)
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(false as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = UnionTranscoder(StringCoder(), NullCoder())

    await expect(coder.decode('hello')).to.eventually.eq('hello')
    await expect(coder.decode(null)).to.eventually.eq(null)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(false as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = UnionTranscoder(StringCoder(), NullCoder())

    await expect(coder.encode('hello')).to.eventually.eq('hello')
    await expect(coder.encode(null)).to.eventually.eq(null)
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(false as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(42 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
