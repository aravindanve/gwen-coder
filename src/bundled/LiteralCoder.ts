import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { NullCoder } from './NullCoder'
import { BooleanCoder } from './BooleanCoder'
import { NumberCoder } from './NumberCoder'
import { StringCoder } from './StringCoder'

const tag = 'LiteralCoder'
const nullCoder = NullCoder()
const booleanCoder = BooleanCoder()
const numberCoder = NumberCoder()
const stringCoder = StringCoder()

/** Specialized literal type */
export type LiteralType = null | boolean | number | string

/** Literal coder factory */
export const LiteralCoder = <T extends LiteralType>(literal: T): Coder<T> => {
  const typeDescription = '' + literal
  const coder = (
    typeof literal === 'boolean' ? booleanCoder :
    typeof literal === 'number' ? numberCoder :
    typeof literal === 'string' ? stringCoder : nullCoder) as Coder<T>

  return {
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert(value, options) {
      return coder.assert(value, options).then(_value => _value === literal
        ? value
        : Promise.reject(new AssertionError({ tag, value, expected: typeDescription })))
    },
    decode(value, options) {
      return coder.decode(value, options).then(_value => _value === literal
        ? _value
        : Promise.reject(new DecodingError({ tag, value, expected: typeDescription })))
    },
    encode(value, options) {
      return coder.encode(value, options).then(_value => _value === literal
        ? _value
        : Promise.reject(new EncodingError({ tag, value, expected: typeDescription })))
    }
  }
}
