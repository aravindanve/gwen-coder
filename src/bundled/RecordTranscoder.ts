import { Coder, Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** Specialized record key type */
export type RecordKeyType = string

/** Specialized record type */
export type Record<K, V> =
  K extends string ? { [key: string]: V } :
  never

/** Record Coder Factory */
export const RecordTranscoder = <K extends RecordKeyType, T, E>(key: Coder<K>, value: Transcoder<T, E>): Transcoder<Record<K, T>, Record<K, E>> => ({
  async pipe(data, options) {
    if (typeof data !== 'object' || data === null) {
      throw AssertionError.new(`Expected ${data} to be object`)
    }

    for (const [_key, _value] of Object.entries(data)) {
      try {
        await key.pipe(_key as any, options)
        await value.pipe(_value, options)

      } catch (err) {
        throw AssertionError.pushContext(err, { key: _key, ref: this })
      }
    }

    return data
  },
  async decode(data, options) {
    if (typeof data !== 'object' || data === null) {
      throw DecodingError.new(`Could not decode data ${data} as structure`)
    }

    const result = {} as any
    for (const [_key, _value] of Object.entries(data)) {
      try {
        result[await key.decode(_key as any, options)] = await value.decode(_value, options)

      } catch (err) {
        throw DecodingError.pushContext(err, { key: _key, ref: this })
      }
    }

    return result as any
  },
  async encode(data, options) {
    if (typeof data !== 'object' || data === null) {
      throw EncodingError.new(`Could not encode data ${data} to structure`)
    }

    const result = {} as any
    for (const [_key, _value] of Object.entries(data)) {
      try {
        result[await key.encode(_key as any, options)] = await value.encode(_value, options)

      } catch (err) {
        throw EncodingError.pushContext(err, { key: _key, ref: this })
      }
    }

    return result as any
  }
})
