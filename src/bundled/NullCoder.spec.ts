import { expect } from 'chai'
import { NullStrainer, NullDecoder, NullEncoder, NullCoder } from './NullCoder'

describe('NullCoder', () => {
  it('can be initialized', () => {
    NullStrainer()
    NullDecoder()
    NullEncoder()
    NullCoder()
  })
  it('casts to decode type', () => {
    expect(NullCoder().asDecodeType(null)).to.eq(null)
    expect(() => NullCoder().asDecodeType(undefined as any)).to.throw('Could not convert')
    expect(() => NullCoder().asDecodeType(true as any)).to.throw('Could not convert')
    expect(() => NullCoder().asDecodeType('' as any)).to.throw('Could not convert')
    expect(() => NullCoder().asDecodeType(42 as any)).to.throw('Could not convert')
    expect(() => NullCoder().asDecodeType([] as any)).to.throw('Could not convert')
    expect(() => NullCoder().asDecodeType({} as any)).to.throw('Could not convert')
  })
  it('casts to encode type', () => {
    expect(NullCoder().asEncodeType(null)).to.eq(null)
    expect(() => NullCoder().asEncodeType(undefined as any)).to.throw('Could not convert')
    expect(() => NullCoder().asEncodeType(true as any)).to.throw('Could not convert')
    expect(() => NullCoder().asEncodeType('' as any)).to.throw('Could not convert')
    expect(() => NullCoder().asEncodeType(42 as any)).to.throw('Could not convert')
    expect(() => NullCoder().asEncodeType([] as any)).to.throw('Could not convert')
    expect(() => NullCoder().asEncodeType({} as any)).to.throw('Could not convert')
  })
  it('decodes type', () => {
    expect(NullCoder().decode(null)).to.eq(null)
    expect(() => NullCoder().decode(undefined as any)).to.throw('Could not convert')
    expect(() => NullCoder().decode(true as any)).to.throw('Could not convert')
    expect(() => NullCoder().decode('' as any)).to.throw('Could not convert')
    expect(() => NullCoder().decode(42 as any)).to.throw('Could not convert')
    expect(() => NullCoder().decode([] as any)).to.throw('Could not convert')
    expect(() => NullCoder().decode({} as any)).to.throw('Could not convert')
  })
  it('encodes type', () => {
    expect(NullCoder().encode(null)).to.eq(null)
    expect(() => NullCoder().encode(undefined as any)).to.throw('Could not convert')
    expect(() => NullCoder().encode(true as any)).to.throw('Could not convert')
    expect(() => NullCoder().encode('' as any)).to.throw('Could not convert')
    expect(() => NullCoder().encode(42 as any)).to.throw('Could not convert')
    expect(() => NullCoder().encode([] as any)).to.throw('Could not convert')
    expect(() => NullCoder().encode({} as any)).to.throw('Could not convert')
  })
})
