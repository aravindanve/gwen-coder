import { Coder, defaultCodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'NullCoder'
const typeDescription = 'null'

/** Null coder factory */
export const NullCoder = (): Coder<null> => ({
  tag,
  typeDescription,
  encodedTypeDescription: typeDescription,
  assert(value) {
    return value === null
      ? Promise.resolve(value)
      : Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
  },
  decode(value, options) {
    if (value === null) {
      return Promise.resolve(value)
    }

    const coerce = options
      ? options.coerceNullFromStringOnDecode
      : defaultCodingOptions.coerceNullFromStringOnDecode

    return coerce && typeof value === 'string' && (value as unknown as string).toLowerCase() === 'null'
      ? Promise.resolve(null)
      : Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
  },
  encode(value) {
    return value === null
      ? Promise.resolve(value)
      : Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
  }
})
