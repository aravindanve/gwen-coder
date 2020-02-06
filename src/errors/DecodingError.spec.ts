import { expect } from 'chai'
import { DecodingError } from './DecodingError'

describe('DecodingError', () => {
  it('can be initialized', () => {
    const error = new DecodingError({ tag: 'tag', value: null, expected: 'number' })
    expect(DecodingError.pushContext(error, { tag: 'tag', expected: 'number' })).to.be.an.instanceOf(DecodingError)
  })
})
