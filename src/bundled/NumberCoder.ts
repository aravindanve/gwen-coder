import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { defaultCodingOptions } from '../defaults'

/** Number Coder Factory */
export const NumberCoder = (): Coder<number> => ({
  pipe(data) {
    if (typeof data === 'number' && !isNaN(data)) {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be number`)
  },
  decode(data, options) {
    if (typeof data === 'number' && !isNaN(data)) {
      return data
    }
    if (options ? options.coerceOnDecode : defaultCodingOptions.coerceOnDecode) {
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
