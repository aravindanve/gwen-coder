import { expect } from 'chai'
import { UnionTranscoder } from './UnionTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { StringCoder } from './StringCoder'
import { NullCoder } from './NullCoder'

describe('UnionTranscoder', () => {
  it('can be initialized', () => {
    UnionTranscoder(StringCoder(), NullCoder())
  })
  it('asserts type on pipe()', async () => {
    const coder = UnionTranscoder(StringCoder(), NullCoder())

    await expect(coder.pipe('hello')).to.eventually.eq('hello')
    await expect(coder.pipe(null)).to.eventually.eq(null)
    await expect(coder.pipe(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(false as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe({} as any)).to.be.rejectedWith(AssertionError)
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
