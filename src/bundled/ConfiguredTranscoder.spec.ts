import { expect } from 'chai'
import { ConfiguredTranscoder } from './ConfiguredTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { AnyCoder } from './AnyCoder'
import { NullCoder } from './NullCoder'

describe('ConfiguredTranscoder', () => {
  it('can be initialized', () => {
    ConfiguredTranscoder(AnyCoder(), {})
  })
  it('asserts type on assert()', async () => {
    const coder = ConfiguredTranscoder(NullCoder(), {})

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
    const coder = ConfiguredTranscoder(NullCoder(), {})

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
    const coder = ConfiguredTranscoder(NullCoder(), { coerceNullFromStringOnDecode: true })

    await expect(coder.decode(null)).to.eventually.eq(null)
    await expect(coder.decode('null' as any)).to.eventually.eq(null)
    await expect(coder.decode('NULL' as any)).to.eventually.eq(null)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(false as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(0 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('0' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)

    await expect(coder.decode('null' as any, { coerceNullFromStringOnDecode: false })).to.eventually.eq(null)
    await expect(coder.decode('NULL' as any, { coerceNullFromStringOnDecode: false })).to.eventually.eq(null)

    coder.setCodingOptions({ coerceNullFromStringOnDecode: false })

    await expect(coder.decode('null' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('NULL' as any)).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = ConfiguredTranscoder(NullCoder(), {})

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
