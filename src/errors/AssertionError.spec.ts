import { expect } from 'chai'
import { AssertionError } from './AssertionError'

describe('AssertionError', () => {
  it('can be initialized', () => {
    const error = new AssertionError({ tag: 'tag', value: null, expected: 'number' })
    expect(AssertionError.pushContext(error, { tag: 'tag', expected: 'number' })).to.be.an.instanceOf(AssertionError)
  })
})
