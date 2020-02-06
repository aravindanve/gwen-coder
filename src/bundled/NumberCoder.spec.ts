import { expect } from 'chai'
import { NumberCoder } from './NumberCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('NumberCoder', () => {
  it('can be initialized', () => {
    NumberCoder()
  })
  it('asserts type on assert()', async () => {
    const coder = NumberCoder()

    await expect(coder.assert(42)).to.eventually.eq(42)
    await expect(coder.assert(NaN)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('42' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = NumberCoder()

    await expect(coder.decode(42)).to.eventually.eq(42)
    await expect(coder.decode(NaN)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('42' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('coerces type on decode()', async () => {
    const coder = NumberCoder()

    await expect(coder.decode(42, { coerceOnDecode: true })).to.eventually.eq(42)
    await expect(coder.decode('42' as any, { coerceOnDecode: true })).to.eventually.eq(42)
    await expect(coder.decode(false as any, { coerceOnDecode: true })).to.eventually.eq(0)
    await expect(coder.decode(true as any, { coerceOnDecode: true })).to.eventually.eq(1)
    await expect(coder.decode(NaN, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(undefined as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('hello' as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = NumberCoder()

    await expect(coder.encode(42)).to.eventually.eq(42)
    await expect(coder.encode(NaN)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('42' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
