// import { expect } from 'chai'
import { IntersectionTranscoder } from './IntersectionTranscoder'
// import { AssertionError, DecodingError, EncodingError } from '../errors'
import { StringCoder } from './StringCoder'
import { NullCoder } from './NullCoder'

// TODO: add tests for object, array and transcoded intersection
describe('IntersectionTranscoder', () => {
  it('can be initialized', () => {
    IntersectionTranscoder(StringCoder(), NullCoder())
  })
})
