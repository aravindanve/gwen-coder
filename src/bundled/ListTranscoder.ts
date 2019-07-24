import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** List Transcoder Factory */
export const ListTranscoder = <T, E> (type: Transcoder < T, E >): Transcoder<T[], E[]> => ({
  async assert(data, options) {
    if (!Array.isArray(data)) {
      throw AssertionError.new(`Expected ${data} to be array`)
    }

    for (const [key, value] of data.entries()) {
      try {
        await type.assert(value, options)

      } catch (err) {
        throw AssertionError.pushContext(err, { key, ref: this })
      }
    }

    return data
  },
  async decode(data, options) {
    if (!Array.isArray(data)) {
      throw DecodingError.new(`Could not decode data ${data} as array`)
    }

    const result = []

    for (const [key, value] of data.entries()) {
      try {
        result.push(await type.decode(value, options))

      } catch (err) {
        throw DecodingError.pushContext(err, { key, ref: this })
      }
    }

    return result
  },
  async encode(data, options) {
    if (!Array.isArray(data)) {
      throw EncodingError.new(`Could not encode data ${data} to array`)
    }

    const result = []

    for (const [key, value] of data.entries()) {
      try {
        result.push(await type.encode(value, options))

      } catch (err) {
        throw EncodingError.pushContext(err, { key, ref: this })
      }
    }

    return result
  }
})
