import { expect } from 'chai'
import { RecordTranscoder } from './RecordTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { StringCoder } from './StringCoder'
import { NumberCoder } from './NumberCoder'
import { OptionalTranscoder } from './OptionalTranscoder'
import { ListTranscoder } from './ListTranscoder'

describe('RecordTranscoder', () => {
  it('can be initialized', () => {
    RecordTranscoder(StringCoder(), StringCoder())
    RecordTranscoder(StringCoder(), ListTranscoder(NumberCoder()))
  })

  it('asserts type on assert()', async () => {
    const coder = RecordTranscoder(StringCoder(), NumberCoder())

    await expect(coder.assert({ 42: 42 })).eventually.deep.eq({ 42: 42 })
    await expect(coder.assert({ value1: 42, value2: 43 })).eventually.deep.eq({ value1: 42, value2: 43 })
    await expect(coder.assert({ value: '42' } as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('42' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(42 as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = RecordTranscoder(StringCoder(), NumberCoder())

    await expect(coder.decode({ 42: 42 })).eventually.deep.eq({ 42: 42 })
    await expect(coder.decode({ value1: 42, value2: 43 })).eventually.deep.eq({ value1: 42, value2: 43 })
    await expect(coder.decode({ value: '42' } as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('42' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any)).to.be.rejectedWith(DecodingError)
  })
  it('coerces type on decode()', async () => {
    const coder = RecordTranscoder(StringCoder(), NumberCoder())

    await expect(coder.decode({ 42: 42 }, { coerceOnDecode: true })).eventually.deep.eq({ 42: 42 })
    await expect(coder.decode({ value1: 42, value2: 43 }, { coerceOnDecode: true })).eventually.deep.eq({ value1: 42, value2: 43 })
    await expect(coder.decode({ value: '42' } as any, { coerceOnDecode: true })).eventually.deep.eq({ value: 42 })
    await expect(coder.decode({ value: 'not a number' } as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(undefined as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('42' as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = RecordTranscoder(StringCoder(), NumberCoder())

    await expect(coder.encode({ 42: 42 })).eventually.deep.eq({ 42: 42 })
    await expect(coder.encode({ value1: 42, value2: 43 })).eventually.deep.eq({ value1: 42, value2: 43 })
    await expect(coder.encode({ value: '42' } as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('42' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(42 as any)).to.be.rejectedWith(EncodingError)
  })
})
