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
  it('asserts type on pipe()', async () => {
    await expect(TupleTranscoder().pipe([])).to.eventually.deep.eq([])
    await expect(TupleTranscoder(NumberCoder()).pipe([1])).to.eventually.deep.eq([1])
    await expect(TupleTranscoder(NumberCoder(), StringCoder()).pipe([1, 'a'])).to.eventually.deep.eq([1, 'a'])

    const coder = TupleTranscoder(StringCoder(), NumberCoder())

    await expect(coder.pipe(['a', 1, 'a'] as any, { ignoreExtraOnPipe: true })).to.eventually.deep.eq(['a', 1, 'a'])
    await expect(coder.pipe(['a', 1, 1] as any, { ignoreExtraOnPipe: true })).to.eventually.deep.eq(['a', 1, 1])

    await expect(coder.pipe(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe('[]' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe({} as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1, 1] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(['a', 'a'] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1, 1, 1] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(['a', 'a', 'a'] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(['a', 1, 'a'] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(['a', 1, 1] as any)).to.be.rejectedWith(AssertionError)
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
