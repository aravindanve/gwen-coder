import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { defaultCodingOptions } from '../defaults'

/** Null Coder Factory */
export const NullCoder = (): Coder<null> => ({
  assert(data) {
    if (data === null) {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be null`)
  },
  decode(data, options) {
    if (data === null) {
      return data
    }
    if (options ? options.coerceNullFromStringOnDecode : defaultCodingOptions.coerceNullFromStringOnDecode) {
      if (typeof data === 'string' && (data as unknown as string).toLowerCase() === 'null') {
        return null
      }
    }

    throw DecodingError.new(`Could not decode data ${data} as null`)
  },
  encode(data) {
    if (data === null) {
      return data
    }

    throw EncodingError.new(`Could not encode data ${data} to null`)
  }
})
