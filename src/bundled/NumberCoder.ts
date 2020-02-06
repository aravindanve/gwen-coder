import { Coder, defaultCodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'NumberCoder'
const typeDescription = 'number'

/** Number coder factory */
export const NumberCoder = (): Coder<number> => ({
  tag,
  typeDescription,
  encodedTypeDescription: typeDescription,
  assert(value) {
    return typeof value === 'number' && !isNaN(value)
      ? Promise.resolve(value)
      : Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
  },
  decode(value, options) {
    if (typeof value === 'number' && !isNaN(value)) {
      return Promise.resolve(value)
    }
    if (options ? options.coerceOnDecode : defaultCodingOptions.coerceOnDecode) {
      switch (typeof value) {
        case 'boolean':
          return Promise.resolve(value ? 1 : 0)

        case 'string':
          if (!isNaN(+value)) return Promise.resolve(+value)
          break
      }
    }

    return Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
  },
  encode(value) {
    return typeof value === 'number' && !isNaN(value)
      ? Promise.resolve(value)
      : Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
  }
})
