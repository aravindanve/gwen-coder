import { expect } from 'chai'
import { EncodingError } from './EncodingError'

describe('EncodingError', () => {
  it('can be initialized', () => {
    expect(EncodingError.new()).to.be.an.instanceOf(EncodingError)
    expect(EncodingError.pushContext(null, { key: 'key', ref: null as any })).to.be.an.instanceOf(EncodingError)
    expect(EncodingError.pushContext('error', { key: 'key', ref: null as any })).to.be.an.instanceOf(EncodingError)
  })
})
