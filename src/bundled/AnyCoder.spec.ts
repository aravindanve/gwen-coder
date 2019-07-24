import { expect } from 'chai'
import { AnyCoder } from './AnyCoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('AnyCoder', () => {
  it('can be initialized', () => {
    AnyCoder()
  })
  it('asserts type on pipe()', () => {
    const coder = AnyCoder()

    expect(coder.pipe(null)).to.eq(null)
    expect(coder.pipe(undefined)).to.eq(undefined)
    expect(coder.pipe(true)).to.eq(true)
    expect(coder.pipe(false)).to.eq(false)
    expect(coder.pipe(0)).to.eq(0)
    expect(coder.pipe('0')).to.eq('0')
    expect(coder.pipe([])).to.deep.eq([])
    expect(coder.pipe({})).to.deep.eq({})
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
