import { expect } from 'chai'
import { ConfiguredTranscoder } from './ConfiguredTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { AnyCoder } from './AnyCoder'
import { NullCoder } from './NullCoder'

describe('ConfiguredTranscoder', () => {
  it('can be initialized', () => {
    ConfiguredTranscoder(AnyCoder(), {})
  })
  it('asserts type on pipe()', () => {
    const coder = ConfiguredTranscoder(NullCoder(), {})

    expect(coder.pipe(null)).to.eq(null)
    expect(() => coder.pipe(undefined as any)).to.throw(AssertionError)
    expect(() => coder.pipe(true as any)).to.throw(AssertionError)
    expect(() => coder.pipe(false as any)).to.throw(AssertionError)
    expect(() => coder.pipe(0 as any)).to.throw(AssertionError)
    expect(() => coder.pipe('0' as any)).to.throw(AssertionError)
    expect(() => coder.pipe([] as any)).to.throw(AssertionError)
    expect(() => coder.pipe({} as any)).to.throw(AssertionError)
  })
  it('decodes type on decode()', () => {
    const coder = ConfiguredTranscoder(NullCoder(), {})

    expect(coder.decode(null)).to.eq(null)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(false as any)).to.throw(DecodingError)
    expect(() => coder.decode(0 as any)).to.throw(DecodingError)
    expect(() => coder.decode('0' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)
  })
  it('coerces type on decode()', () => {
    const coder = ConfiguredTranscoder(NullCoder(), { coerceNullFromStringOnDecode: true })

    expect(coder.decode(null)).to.eq(null)
    expect(coder.decode('null' as any)).to.eq(null)
    expect(coder.decode('NULL' as any)).to.eq(null)
    expect(() => coder.decode(undefined as any)).to.throw(DecodingError)
    expect(() => coder.decode(true as any)).to.throw(DecodingError)
    expect(() => coder.decode(false as any)).to.throw(DecodingError)
    expect(() => coder.decode(0 as any)).to.throw(DecodingError)
    expect(() => coder.decode('0' as any)).to.throw(DecodingError)
    expect(() => coder.decode([] as any)).to.throw(DecodingError)
    expect(() => coder.decode({} as any)).to.throw(DecodingError)

    expect(coder.decode('null' as any, { coerceNullFromStringOnDecode: false })).to.eq(null)
    expect(coder.decode('NULL' as any, { coerceNullFromStringOnDecode: false })).to.eq(null)

    coder.setCodingOptions({ coerceNullFromStringOnDecode: false })

    expect(() => coder.decode('null' as any)).to.throw(DecodingError)
    expect(() => coder.decode('NULL' as any)).to.throw(DecodingError)
  })
  it('encodes type on encode()', () => {
    const coder = ConfiguredTranscoder(NullCoder(), {})

    expect(coder.encode(null)).to.eq(null)
    expect(() => coder.encode(undefined as any)).to.throw(EncodingError)
    expect(() => coder.encode(true as any)).to.throw(EncodingError)
    expect(() => coder.encode(false as any)).to.throw(EncodingError)
    expect(() => coder.encode(0 as any)).to.throw(EncodingError)
    expect(() => coder.encode('0' as any)).to.throw(EncodingError)
    expect(() => coder.encode([] as any)).to.throw(EncodingError)
    expect(() => coder.encode({} as any)).to.throw(EncodingError)
  })
})
