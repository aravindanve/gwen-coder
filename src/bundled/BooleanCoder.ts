import { Coder, defaultCodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'BooleanCoder'
const typeDescription = 'boolean'

/** Boolean coder factory */
export const BooleanCoder = (): Coder<boolean> => ({
  tag,
  typeDescription,
  encodedTypeDescription: typeDescription,
  assert(value) {
    return typeof value === 'boolean'
      ? Promise.resolve(value)
      : Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
  },
  decode(value, options) {
    if (typeof value === 'boolean') {
      return Promise.resolve(value)
    }
    if (options ? options.coerceOnDecode : defaultCodingOptions.coerceOnDecode) {
      switch (typeof value) {
        case 'number':
          if (value === 0) return Promise.resolve(false)
          if (value === 1) return Promise.resolve(true)
          break

        case 'string':
          const string = (value as string).toLowerCase()
          if (string === '0' || string === 'false') return Promise.resolve(false)
          if (string === '1' || string === 'true') return Promise.resolve(true)
          break
      }
    }

    return Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
  },
  encode(value) {
    return typeof value === 'boolean'
      ? Promise.resolve(value)
      : Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
  }
})
