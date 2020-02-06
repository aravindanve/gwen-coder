import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'UndefinedCoder'
const typeDescription = 'undefined'

/** Undefined coder factory */
export const UndefinedCoder = (): Coder<undefined> => ({
  tag,
  typeDescription,
  encodedTypeDescription: typeDescription,
  assert(value) {
    return value === undefined
      ? Promise.resolve(value)
      : Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
  },
  decode(value) {
    return value === undefined
      ? Promise.resolve(value)
      : Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
  },
  encode(value) {
    return value === undefined
      ? Promise.resolve(value)
      : Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
  }
})
