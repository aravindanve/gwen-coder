import { expect } from 'chai'
import { ListTranscoder } from './ListTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { StringCoder } from './StringCoder'
import { NumberCoder } from './NumberCoder'
import { UnionTranscoder } from './UnionTranscoder'

describe('ListTranscoder', () => {
  it('can be initialized', () => {
    ListTranscoder(StringCoder())
    ListTranscoder(NumberCoder())
    ListTranscoder(UnionTranscoder(StringCoder(), NumberCoder()))
  })
  it('asserts type on pipe()', async () => {
    await expect(ListTranscoder(NumberCoder()).pipe([1, 2, 3])).to.eventually.deep.eq([1, 2, 3])
    await expect(ListTranscoder(NumberCoder()).pipe([])).to.eventually.deep.eq([])

    const coder = ListTranscoder(UnionTranscoder(NumberCoder(), StringCoder()))

    await expect(coder.pipe([1, 'hello', 3])).to.eventually.deep.eq([1, 'hello', 3])
    await expect(coder.pipe(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe('[]' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe({} as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1, undefined as any, 3])).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1, null as any, 3])).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1, false as any, 3])).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1, [] as any, 3])).to.be.rejectedWith(AssertionError)
    await expect(coder.pipe([1, {} as any, 3])).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    await expect(ListTranscoder(NumberCoder()).decode([1, 2, 3])).to.eventually.deep.eq([1, 2, 3])
    await expect(ListTranscoder(NumberCoder()).decode([])).to.eventually.deep.eq([])

    const coder = ListTranscoder(UnionTranscoder(NumberCoder(), StringCoder()))

    await expect(coder.decode([1, 'hello', 3])).to.eventually.deep.eq([1, 'hello', 3])
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('[]' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1, undefined as any, 3])).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1, null as any, 3])).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1, false as any, 3])).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1, [] as any, 3])).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([1, {} as any, 3])).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    await expect(ListTranscoder(NumberCoder()).encode([1, 2, 3])).to.eventually.deep.eq([1, 2, 3])
    await expect(ListTranscoder(NumberCoder()).encode([])).to.eventually.deep.eq([])

    const coder = ListTranscoder(UnionTranscoder(NumberCoder(), StringCoder()))

    await expect(coder.encode([1, 'hello', 3])).to.eventually.deep.eq([1, 'hello', 3])
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(42 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('[]' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1, undefined as any, 3])).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1, null as any, 3])).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1, false as any, 3])).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1, [] as any, 3])).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([1, {} as any, 3])).to.be.rejectedWith(EncodingError)
  })
})