import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** Undefined Coder Factory */
export const UndefinedCoder = (): Coder<undefined> => ({
  assert(data) {
    if (data === undefined) {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be undefined`)
  },
  decode(data) {
    if (data === undefined) {
      return data
    }

    throw DecodingError.new(`Could not decode data ${data} as undefined`)
  },
  encode(data) {
    if (data === undefined) {
      return data
    }

    throw EncodingError.new(`Could not encode data ${data} to undefined`)
  }
})
