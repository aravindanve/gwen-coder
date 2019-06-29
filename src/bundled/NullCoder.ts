import { Coder, CodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** Null Coder Factory */
export const NullCoder = (options?: CodingOptions): Coder<null> => ({
  codingOptions: {
    coerceNullFromStringOnDecode: false,
    ...options
  },
  pipe(data) {
    if (data === null) {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be null`)
  },
  decode(data) {
    if (data === null) {
      return data
    }
    if (this.codingOptions.coerceNullFromStringOnDecode) {
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
