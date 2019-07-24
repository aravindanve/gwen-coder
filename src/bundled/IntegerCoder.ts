import { Coder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { NumberCoder } from './NumberCoder'

/** Integer Coder Factory */
export function IntegerCoder(): Coder<number> {
  const coder = NumberCoder()

  return {
    assert(data, options) {
      if (Number.isInteger(coder.assert(data, options) as number)) {
        return data
      }

      throw AssertionError.new(`Expected ${data} to be integer`)
    },
    decode(data, options) {
      let value
      if (Number.isInteger(value = coder.decode(data, options) as number)) {
        return value
      }

      throw DecodingError.new(`Could not decode data ${data} as integer`)
    },
    encode(data, options) {
      let value
      if (Number.isInteger(value = coder.encode(data, options) as number)) {
        return value
      }

      throw EncodingError.new(`Could not encode data ${data} to integer`)
    }
  }
}
