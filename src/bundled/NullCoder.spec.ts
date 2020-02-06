import { expect } from 'chai'
import { NullCoder } from './NullCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('NullCoder', () => {
  it('can be initialized', () => {
    NullCoder()
  })
  it('asserts type on assert()', async () => {
    const coder = NullCoder()

    await expect(coder.assert(null)).to.eventually.eq(null)
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(false as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(0 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('0' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = NullCoder()

    await expect(coder.decode(null)).to.eventually.eq(null)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(false as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(0 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('0' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('coerces type on decode()', async () => {
    const coder = NullCoder()

    await expect(coder.decode(null, { coerceNullFromStringOnDecode: true })).to.eventually.eq(null)
    await expect(coder.decode('null' as any, { coerceNullFromStringOnDecode: true })).to.eventually.eq(null)
    await expect(coder.decode('NULL' as any, { coerceNullFromStringOnDecode: true })).to.eventually.eq(null)
    await expect(coder.decode(undefined as any, { coerceNullFromStringOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any, { coerceNullFromStringOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(false as any, { coerceNullFromStringOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(0 as any, { coerceNullFromStringOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('0' as any, { coerceNullFromStringOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any, { coerceNullFromStringOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any, { coerceNullFromStringOnDecode: true })).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = NullCoder()

    await expect(coder.encode(null)).to.eventually.eq(null)
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(false as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(0 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('0' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
