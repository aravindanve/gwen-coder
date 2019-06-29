import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** Array Transcoder Factory */
export function ArrayTranscoder<T, E>(type: Transcoder<T, E>): Transcoder<T[], E[]> {
  return {
    codingOptions: {},
    async pipe(data) {
      if (!Array.isArray(data)) {
        throw AssertionError.new(`Expected ${data} to be array`)
      }
      for (const [key, value] of data.entries()) {
        try {
          await type.pipe(value)

        } catch (err) {
          throw AssertionError.pushContext(err, { key, ref: this })
        }
      }

      return data
    },
    async decode(data) {
      if (!Array.isArray(data)) {
        throw DecodingError.new(`Could not decode data ${data} as array`)
      }

      const result = []
      for (const [key, value] of data.entries()) {
        try {
          result.push(await type.decode(value))

        } catch (err) {
          throw DecodingError.pushContext(err, { key, ref: this })
        }
      }

      return result
    },
    async encode(data) {
      if (!Array.isArray(data)) {
        throw EncodingError.new(`Could not encode data ${data} to array`)
      }

      const result = []
      for (const [key, value] of data.entries()) {
        try {
          result.push(await type.encode(value))

        } catch (err) {
          throw EncodingError.pushContext(err, { key, ref: this })
        }
      }

      return result
    }
  }
}
