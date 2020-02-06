import { expect } from 'chai'
import { AnyCoder } from './AnyCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('AnyCoder', () => {
  it('can be initialized', () => {
    AnyCoder()
  })
  it('asserts type on assert()', async () => {
    const coder = AnyCoder()

    await expect(coder.assert(null)).eventually.eq(null)
    await expect(coder.assert(undefined)).eventually.eq(undefined)
    await expect(coder.assert(true)).eventually.eq(true)
    await expect(coder.assert(false)).eventually.eq(false)
    await expect(coder.assert(0)).eventually.eq(0)
    await expect(coder.assert('0')).eventually.eq('0')
    await expect(coder.assert([])).to.eventually.deep.eq([])
    await expect(coder.assert({})).to.eventually.deep.eq({})
  })
  it('decodes type on decode()', async () => {
    const coder = AnyCoder()

    await expect(coder.decode(null)).eventually.eq(null)
    await expect(coder.decode(undefined)).eventually.eq(undefined)
    await expect(coder.decode(true)).eventually.eq(true)
    await expect(coder.decode(false)).eventually.eq(false)
    await expect(coder.decode(0)).eventually.eq(0)
    await expect(coder.decode('0')).eventually.eq('0')
    await expect(coder.decode([])).to.eventually.deep.eq([])
    await expect(coder.decode({})).to.eventually.deep.eq({})
  })
  it('encodes type on encode()', async () => {
    const coder = AnyCoder()

    await expect(coder.encode(null)).eventually.eq(null)
    await expect(coder.encode(undefined)).eventually.eq(undefined)
    await expect(coder.encode(true)).eventually.eq(true)
    await expect(coder.encode(false)).eventually.eq(false)
    await expect(coder.encode(0)).eventually.eq(0)
    await expect(coder.encode('0')).eventually.eq('0')
    await expect(coder.encode([])).to.eventually.deep.eq([])
    await expect(coder.encode({})).to.eventually.deep.eq({})
  })
})
