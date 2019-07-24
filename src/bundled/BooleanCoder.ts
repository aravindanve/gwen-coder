import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { defaultCodingOptions } from '../defaults'

/** Boolean Coder Factory */
export const BooleanCoder = (): Coder<boolean> => ({
  pipe(data) {
    if (typeof data === 'boolean') {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be boolean`)
  },
  decode(data, options) {
    if (typeof data === 'boolean') {
      return data
    }
    if (options ? options.coerceOnDecode : defaultCodingOptions.coerceOnDecode) {
      switch (typeof data) {
        case 'number':
          if (data === 0) return false
          if (data === 1) return true
          break

        case 'string':
          const string = (data as string).toLowerCase()
          if (string === '0' || string === 'false') return false
          if (string === '1' || string === 'true') return true
          break
      }
    }

    throw DecodingError.new(`Could not decode data ${data} as boolean`)
  },
  encode(data) {
    if (typeof data === 'boolean') {
      return data
    }

    throw EncodingError.new(`Could not encode data ${data} to boolean`)
  }
})
