import { expect } from 'chai'
import { AssertionError } from './AssertionError'

describe('AssertionError', () => {
  it('can be initialized', () => {
    expect(AssertionError.new()).to.be.an.instanceOf(AssertionError)
    expect(AssertionError.pushContext(null, { key: 'key', ref: null as any })).to.be.an.instanceOf(AssertionError)
    expect(AssertionError.pushContext('error', { key: 'key', ref: null as any })).to.be.an.instanceOf(AssertionError)
  })
})
