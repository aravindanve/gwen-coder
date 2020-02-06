import { expect } from 'chai'
import { DateTimeTranscoder } from './DateTimeTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('DateTimeTranscoder', () => {
  it('can be initialized', () => {
    DateTimeTranscoder()
  })
  it('asserts type on assert()', async () => {
    const coder = DateTimeTranscoder()
    const date = new Date()

    await expect(coder.assert(date).then(o => o.toISOString())).to.eventually.eq(date.toISOString())
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(new Date('bad date'))).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    const coder = DateTimeTranscoder()
    const string = (new Date()).toISOString()

    await expect(coder.decode(string).then(o => o.toISOString())).to.eventually.eq(string)
    await expect(coder.decode('hello')).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    const coder = DateTimeTranscoder()
    const date = new Date()
    const string = date.toISOString()

    await expect(coder.encode(date)).to.eventually.eq(string)
    await expect(coder.encode('hello' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(42 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
  })
})
