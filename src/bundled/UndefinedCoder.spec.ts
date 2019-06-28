import { expect } from 'chai'
import { UndefinedStrainer, UndefinedDecoder, UndefinedEncoder, UndefinedCoder } from './UndefinedCoder'

describe('UndefinedCoder', () => {
  it('can be initialized', () => {
    UndefinedStrainer()
    UndefinedDecoder()
    UndefinedEncoder()
    UndefinedCoder()
  })
  it('casts to decode type', () => {
    expect(UndefinedCoder().asDecodeType(undefined)).to.eq(undefined)
    expect(() => UndefinedCoder().asDecodeType(null as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asDecodeType(true as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asDecodeType('' as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asDecodeType(42 as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asDecodeType([] as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asDecodeType({} as any)).to.throw('Could not convert')
  })
  it('casts to encode type', () => {
    expect(UndefinedCoder().asEncodeType(undefined)).to.eq(undefined)
    expect(() => UndefinedCoder().asEncodeType(null as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asEncodeType(true as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asEncodeType('' as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asEncodeType(42 as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asEncodeType([] as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().asEncodeType({} as any)).to.throw('Could not convert')
  })
  it('decodes type', () => {
    expect(UndefinedCoder().decode(undefined)).to.eq(undefined)
    expect(() => UndefinedCoder().decode(null as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().decode(true as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().decode('' as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().decode(42 as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().decode([] as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().decode({} as any)).to.throw('Could not convert')
  })
  it('encodes type', () => {
    expect(UndefinedCoder().encode(undefined)).to.eq(undefined)
    expect(() => UndefinedCoder().encode(null as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().encode(true as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().encode('' as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().encode(42 as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().encode([] as any)).to.throw('Could not convert')
    expect(() => UndefinedCoder().encode({} as any)).to.throw('Could not convert')
  })
})
