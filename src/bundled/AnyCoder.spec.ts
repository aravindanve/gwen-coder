import { expect } from 'chai'
import { AnyCoder } from './AnyCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('AnyCoder', () => {
  it('can be initialized', () => {
    AnyCoder()
  })
  it('asserts type on assert()', () => {
    const coder = AnyCoder()

    expect(coder.assert(null)).to.eq(null)
    expect(coder.assert(undefined)).to.eq(undefined)
    expect(coder.assert(true)).to.eq(true)
    expect(coder.assert(false)).to.eq(false)
    expect(coder.assert(0)).to.eq(0)
    expect(coder.assert('0')).to.eq('0')
    expect(coder.assert([])).to.deep.eq([])
    expect(coder.assert({})).to.deep.eq({})
  })
  it('decodes type on decode()', () => {
    const coder = AnyCoder()

    expect(coder.decode(null)).to.eq(null)
    expect(coder.decode(undefined)).to.eq(undefined)
    expect(coder.decode(true)).to.eq(true)
    expect(coder.decode(false)).to.eq(false)
    expect(coder.decode(0)).to.eq(0)
    expect(coder.decode('0')).to.eq('0')
    expect(coder.decode([])).to.deep.eq([])
    expect(coder.decode({})).to.deep.eq({})
  })
  it('encodes type on encode()', () => {
    const coder = AnyCoder()

    expect(coder.encode(null)).to.eq(null)
    expect(coder.encode(undefined)).to.eq(undefined)
    expect(coder.encode(true)).to.eq(true)
    expect(coder.encode(false)).to.eq(false)
    expect(coder.encode(0)).to.eq(0)
    expect(coder.encode('0')).to.eq('0')
    expect(coder.encode([])).to.deep.eq([])
    expect(coder.encode({})).to.deep.eq({})
  })
})
