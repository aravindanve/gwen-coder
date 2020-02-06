import { expect } from 'chai'
import { BooleanCoder } from './BooleanCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('BooleanCoder', () => {
  it('can be initialized', () => {
    BooleanCoder()
  })
  it('asserts type on assert()', async () => {
    const coder = BooleanCoder()

    await expect(coder.assert(true)).to.eventually.eq(true)
    await expect(coder.assert(false)).to.eventually.eq(false)
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(0 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('0' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = BooleanCoder()

    await expect(coder.decode(true)).to.eventually.eq(true)
    await expect(coder.decode(false)).to.eventually.eq(false)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(0 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('0' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('coerces type on decode()', async () => {
    const coder = BooleanCoder()

    await expect(coder.decode(true, { coerceOnDecode: true })).to.eventually.eq(true)
    await expect(coder.decode(false, { coerceOnDecode: true })).to.eventually.eq(false)
    await expect(coder.decode(0 as any, { coerceOnDecode: true })).to.eventually.eq(false)
    await expect(coder.decode('0' as any, { coerceOnDecode: true })).to.eventually.eq(false)
    await expect(coder.decode('false' as any, { coerceOnDecode: true })).to.eventually.eq(false)
    await expect(coder.decode('FALSE' as any, { coerceOnDecode: true })).to.eventually.eq(false)
    await expect(coder.decode(1 as any, { coerceOnDecode: true })).to.eventually.eq(true)
    await expect(coder.decode('1' as any, { coerceOnDecode: true })).to.eventually.eq(true)
    await expect(coder.decode('true' as any, { coerceOnDecode: true })).to.eventually.eq(true)
    await expect(coder.decode('TRUE' as any, { coerceOnDecode: true })).to.eventually.eq(true)
    await expect(coder.decode(undefined as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(-1 as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('42' as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = BooleanCoder()

    await expect(coder.encode(true)).to.eventually.eq(true)
    await expect(coder.encode(false)).to.eventually.eq(false)
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(0 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('0' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
