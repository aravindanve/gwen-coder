import { Coder, CodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** Number Coder Factory */
export const NumberCoder = (options?: CodingOptions): Coder<number> => ({
  codingOptions: {
    coerceOnDecode: false,
    ...options
  },
  pipe(data) {
    if (typeof data === 'number' && !isNaN(data)) {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be number`)
  },
  decode(data) {
    if (typeof data === 'number' && !isNaN(data)) {
      return data
    }
    if (this.codingOptions.coerceOnDecode) {
      switch (typeof data) {
        case 'boolean':
          return data ? 1 : 0

        case 'string':
          if (!isNaN(+data)) {
            return +data
          }
          break
      }
    }

    throw DecodingError.new(`Could not decode data ${data} as number`)
  },
  encode(data) {
    if (typeof data === 'number' && !isNaN(data)) {
      return data
    }

    throw EncodingError.new(`Could not encode data ${data} to number`)
  }
})
