import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { NumberCoder } from './NumberCoder'

const tag = 'IntegerCoder'
const typeDescription = 'number (integer)'
const numberCoder = NumberCoder()

/** Integer coder factory */
export const IntegerCoder = (): Coder<number> => ({
  tag,
  typeDescription,
  encodedTypeDescription: typeDescription,
  assert(value, options) {
    return numberCoder.assert(value, options).then(_value => Number.isInteger(_value)
      ? _value
      : Promise.reject(new AssertionError({ tag, value, expected: typeDescription })))
  },
  decode(value, options) {
    return numberCoder.decode(value, options).then(_value => Number.isInteger(_value)
      ? _value
      : Promise.reject(new DecodingError({ tag, value, expected: typeDescription })))
  },
  encode(value, options) {
    return numberCoder.encode(value, options).then(_value => Number.isInteger(_value)
      ? _value
      : Promise.reject(new EncodingError({ tag, value, expected: typeDescription })))
  }
})
