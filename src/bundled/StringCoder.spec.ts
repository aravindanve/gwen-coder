import { expect } from 'chai'
import { StringCoder } from './StringCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('StringCoder', () => {
  it('can be initialized', () => {
    StringCoder()
  })
  it('asserts type on assert()', async () => {
    const coder = StringCoder()

    await expect(coder.assert('hello')).to.eventually.eq('hello')
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = StringCoder()

    await expect(coder.decode('hello')).to.eventually.eq('hello')
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('coerces type on decode()', async () => {
    const coder = StringCoder()

    await expect(coder.decode('hello', { coerceOnDecode: true })).to.eventually.eq('hello')
    await expect(coder.decode(42 as any, { coerceOnDecode: true })).to.eventually.eq('42')
    await expect(coder.decode(true as any, { coerceOnDecode: true })).to.eventually.eq('true')
    await expect(coder.decode(undefined as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any, { coerceOnDecode: true })).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = StringCoder()

    await expect(coder.encode('hello')).to.eventually.eq('hello')
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(42 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
