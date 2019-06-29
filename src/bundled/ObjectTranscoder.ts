import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** String-keyed map of property transcoders */
export type PropertyTranscoders = {
  [key: string]: Transcoder<unknown, unknown>
}

/** Specialized object transcoder */
export type ObjectTranscoder<P> = Transcoder<
  { [K in keyof P]: P[K] extends Transcoder<infer T, any> ? T : never },
  { [K in keyof P]: P[K] extends Transcoder<any, infer E> ? E : never }>

/** Object Transcoder Factory */
export function ObjectTranscoder<P extends PropertyTranscoders>(properties: P): ObjectTranscoder<P> {
  return {
    codingOptions: {},
    async pipe(data) {
      if (typeof data !== 'object' || data === null) {
        throw AssertionError.new(`Expected ${data} to be object`)
      }
      for (const [key, type] of Object.entries(properties)) {
        try {
          await type.pipe(data[key])

        } catch (err) {
          throw AssertionError.pushContext(err, { key, ref: this })
        }
      }

      return data
    },
    async decode(data) {
      if (typeof data !== 'object' || data === null) {
        throw DecodingError.new(`Could not decode data ${data} as object`)
      }

      const result = {}
      for (const [key, type] of Object.entries(properties)) {
        try {
          result[key] = await type.decode(data[key])

        } catch (err) {
          throw DecodingError.pushContext(err, { key, ref: this })
        }
      }

      return result as any
    },
    async encode(data) {
      if (typeof data !== 'object' || data === null) {
        throw EncodingError.new(`Could not encode data ${data} to object`)
      }

      const result = {}
      for (const [key, type] of Object.entries(properties)) {
        try {
          result[key] = await type.encode(data[key])

        } catch (err) {
          throw EncodingError.pushContext(err, { key, ref: this })
        }
      }

      return result as any
    }
  }
}
