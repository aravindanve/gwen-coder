import { expect } from 'chai'
import { UndefinedCoder } from './UndefinedCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('UndefinedCoder', () => {
  it('can be initialized', () => {
    UndefinedCoder()
  })
  it('asserts type on assert()', async () => {
    const coder = UndefinedCoder()

    await expect(coder.assert(undefined)).to.eventually.eq(undefined)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(false as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(0 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('0' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = UndefinedCoder()

    await expect(coder.decode(undefined)).to.eventually.eq(undefined)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(false as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(0 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('0' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = UndefinedCoder()

    await expect(coder.encode(undefined)).to.eventually.eq(undefined)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(false as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(0 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('0' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
