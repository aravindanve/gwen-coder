import { expect } from 'chai'
import { DateTimeTranscoder } from './DateTimeTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'

describe('DateTimeTranscoder', () => {
  it('can be initialized', () => {
    DateTimeTranscoder()
  })
  it('asserts type on assert()', () => {
    const coder = DateTimeTranscoder()
    const date = new Date()

    expect((coder.assert(date) as Date).toISOString()).to.eq(date.toISOString())
    expect(() => coder.assert(undefined as any)).to.throw(AssertionError)
    expect(() => coder.assert(new Date('bad date'))).to.throw(AssertionError)
    expect(() => coder.assert(null as any)).to.throw(AssertionError)
    expect(() => coder.assert(true as any)).to.throw(AssertionError)
    expect(() => coder.assert(42 as any)).to.throw(AssertionError)
    expect(() => coder.assert([] as any)).to.throw(AssertionError)
    expect(() => coder.assert({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = DateTimeTranscoder()
    const string = (new Date()).toISOString()

    expect((coder.decode(string) as Date).toISOString()).to.eq(string)
    expect(() => coder.decode('hello')).to.throw(DecodingError)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(null as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(42 as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = DateTimeTranscoder()
    const date = new Date()
    const string = date.toISOString()

    expect(coder.encode(date)).to.eq(string)
    expect(() => coder.encode('hello' as any)).to.throw(EncodingError)
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(null as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode(42 as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
