import { expect } from 'chai'
import { DecodingError } from './DecodingError'

describe('DecodingError', () => {
  it('can be initialized', () => {
    expect(DecodingError.new()).to.be.an.instanceOf(DecodingError)
    expect(DecodingError.pushContext(null, { key: 'key', ref: null as any })).to.be.an.instanceOf(DecodingError)
    expect(DecodingError.pushContext('error', { key: 'key', ref: null as any })).to.be.an.instanceOf(DecodingError)
  })
})
