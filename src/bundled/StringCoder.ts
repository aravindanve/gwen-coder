import { Coder, defaultCodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'StringCoder'
const typeDescription = 'string'

/** String coder factory */
export const StringCoder = (): Coder<string> => ({
  tag,
  typeDescription,
  encodedTypeDescription: typeDescription,
  assert(value) {
    return typeof value === 'string'
      ? Promise.resolve(value)
      : Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
  },
  decode(value, options) {
    if (typeof value === 'string') {
      return Promise.resolve(value)
    }
    if (options ? options.coerceOnDecode : defaultCodingOptions.coerceOnDecode) {
      switch (typeof value) {
        case 'number':
        case 'boolean':
          return Promise.resolve('' + value)
      }
    }

    return Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
  },
  encode(value) {
    return typeof value === 'string'
      ? Promise.resolve(value)
      : Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
  }
})
