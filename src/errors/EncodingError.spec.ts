import { expect } from 'chai'
import { EncodingError } from './EncodingError'

describe('EncodingError', () => {
  it('can be initialized', () => {
    const error = new EncodingError({ tag: 'tag', value: null, expected: 'number' })
    expect(EncodingError.pushContext(error, { tag: 'tag', expected: 'number' })).to.be.an.instanceOf(EncodingError)
  })
})
