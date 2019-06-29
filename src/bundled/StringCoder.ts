import { Coder, CodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** String Coder Factory */
export const StringCoder = (options?: CodingOptions): Coder<string> => ({
  codingOptions: {
    coerceOnDecode: false,
    ...options
  },
  pipe(data) {
    if (typeof data === 'string') {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be string`)
  },
  decode(data) {
    if (typeof data === 'string') {
      return data
    }
    if (this.codingOptions.coerceOnDecode) {
      switch (typeof data) {
        case 'number':
        case 'boolean':
          return '' + data
      }
    }

    throw DecodingError.new(`Could not decode data ${data} as string`)
  },
  encode(data) {
    if (typeof data === 'string') {
      return data
    }

    throw EncodingError.new(`Could not encode data ${data} to string`)
  }
})
