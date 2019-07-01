import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** String-keyed map of property transcoders */
export type PropertyTranscoders = {
  [key: string]: Transcoder<unknown, unknown>
}

/** Additional property transcoder */
export type AdditionalPropertyTranscoder = Transcoder<unknown, unknown>

/** Specialized structure type */
export type AlwaysDefinedKeys<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]
export type Structure<T> = Partial<T> & Pick<T, AlwaysDefinedKeys<T>>

/** Specialized structure transcoder */
export type StructureTranscoder<P> = Transcoder<
  Structure<{ [K in keyof P]: P[K] extends Transcoder<infer T, any> ? T : never }>,
  Structure<{ [K in keyof P]: P[K] extends Transcoder<any, infer E> ? E : never }>>

// NOTE: additional properties are difficult to implement because it's unclear how to
// express the type for the additional properties. For example, this is not yet supported:
// ```ts
// interface Example {
//   [letter: 'a' | 'b' | 'c']: number;
//   [rest: ...any]: string;
// }
// ```
// see:
// https://github.com/Microsoft/TypeScript/issues/7765

/** Structure Transcoder Factory */
export function StructureTranscoder<P extends PropertyTranscoders>(properties: P): StructureTranscoder<P> {
  const knownKeys = Object.keys(properties)
  const knownKeysMap = knownKeys.reduce((acc, key) => (acc[key] = true, acc), Object.create(null))
  const knownEntries = Object.entries(properties)

  return {
    codingOptions: {},
    async pipe(data) {
      if (typeof data !== 'object' || data === null) {
        throw AssertionError.new(`Expected ${data} to be object`)
      }

      // check for unknown keys
      const unknownKeys = Object.keys(data).filter(key => !knownKeysMap[key])
      if (unknownKeys.length) {
        throw AssertionError.new(`Found unknown keys ${unknownKeys} in structure`)
      }

      for (const [key, type] of knownEntries) {
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
        throw DecodingError.new(`Could not decode data ${data} as structure`)
      }

      const result = {}
      for (const [key, type] of knownEntries) {
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
        throw EncodingError.new(`Could not encode data ${data} to structure`)
      }

      const result = {}
      for (const [key, type] of knownEntries) {
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
