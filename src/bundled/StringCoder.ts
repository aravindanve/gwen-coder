import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { defaultCodingOptions } from '../defaults'

/** String Coder Factory */
export const StringCoder = (): Coder<string> => ({
  pipe(data) {
    if (typeof data === 'string') {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be string`)
  },
  decode(data, options) {
    if (typeof data === 'string') {
      return data
    }
    if (options ? options.coerceOnDecode : defaultCodingOptions.coerceOnDecode) {
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
