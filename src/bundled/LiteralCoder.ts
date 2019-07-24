import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { NullCoder } from './NullCoder'
import { BooleanCoder } from './BooleanCoder'
import { NumberCoder } from './NumberCoder'
import { StringCoder } from './StringCoder'

/** Specialized literal type */
export type LiteralType = null | boolean | number | string

/** Literal Coder Factory */
export function LiteralCoder<T extends LiteralType>(value: T): Coder<T> {
  const coder: Coder<T> =
    typeof value === 'boolean' ? BooleanCoder() :
    typeof value === 'number' ? NumberCoder() :
    typeof value === 'string' ? StringCoder() : NullCoder() as any

  return {
    assert(data, options) {
      const result = coder.assert(data, options)
      if (result === value) {
        return result
      }

      throw AssertionError.new(`Expected ${data} to be ${value}`)
    },
    decode(data, options) {
      const result = coder.decode(data, options)
      if (result === value) {
        return result
      }

      throw DecodingError.new(`Could not decode data ${data} as ${value}`)
    },
    encode(data, options) {
      const result = coder.encode(data, options)
      if (result === value) {
        return result
      }

      throw EncodingError.new(`Could not encode data ${data} as ${value}`)
    }
  }
}
