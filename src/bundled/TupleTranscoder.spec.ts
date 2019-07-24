import { expect } from 'chai'
import { TupleTranscoder } from './TupleTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { StringCoder } from './StringCoder'
import { NumberCoder } from './NumberCoder'
import { UnionTranscoder } from './UnionTranscoder'

describe('TupleTranscoder', () => {
  it('can be initialized', () => {
    TupleTranscoder(StringCoder())
    TupleTranscoder(StringCoder(), NumberCoder())
    TupleTranscoder(NumberCoder(), UnionTranscoder(StringCoder(), NumberCoder()))
  })
  it('asserts type on assert()', async () => {
    await expect(TupleTranscoder().assert([])).to.eventually.deep.eq([])
    await expect(TupleTranscoder(NumberCoder()).assert([1])).to.eventually.deep.eq([1])
    await expect(TupleTranscoder(NumberCoder(), StringCoder()).assert([1, 'a'])).to.eventually.deep.eq([1, 'a'])

    const coder = TupleTranscoder(StringCoder(), NumberCoder())

    await expect(coder.assert(['a', 1, 'a'] as any, { ignoreExtraOnAssert: true })).to.eventually.deep.eq(['a', 1, 'a'])
    await expect(coder.assert(['a', 1, 1] as any, { ignoreExtraOnAssert: true })).to.eventually.deep.eq(['a', 1, 1])

    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('[]' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([1] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([1, 1] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(['a', 'a'] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([1, 1, 1] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(['a', 'a', 'a'] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(['a', 1, 'a'] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(['a', 1, 1] as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    await expect(TupleTranscoder().decode([])).to.eventually.deep.eq([])
    await expect(TupleTranscoder(NumberCoder()).decode([1])).to.eventually.deep.eq([1])
    await expect(TupleTranscoder(NumberCoder(), StringCoder()).decode([1, 'a'])).to.eventually.deep.eq([1, 'a'])

    const coder = TupleTranscoder(StringCoder(), NumberCoder())

    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('[]' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1, 1] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(['a', 'a'] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1, 1, 1] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(['a', 'a', 'a'] as any)).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    await expect(TupleTranscoder().encode([])).to.eventually.deep.eq([])
    await expect(TupleTranscoder(NumberCoder()).encode([1])).to.eventually.deep.eq([1])
    await expect(TupleTranscoder(NumberCoder(), StringCoder()).encode([1, 'a'])).to.eventually.deep.eq([1, 'a'])

    const coder = TupleTranscoder(StringCoder(), NumberCoder())

    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(42 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('[]' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1, 1] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(['a', 'a'] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1, 1, 1] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(['a', 'a', 'a'] as any)).to.be.rejectedWith(EncodingError)
  })
})
