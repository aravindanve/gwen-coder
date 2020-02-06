import { Transcoder, defaultCodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'StructureTranscoder'

/** String-keyed map of property transcoders */
export type PropertyTranscoders = {
  [key: string]: Transcoder<unknown, unknown>
}

/** Specialized structure type */
export type AlwaysDefinedKeys<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]
export type Structure<T> = Partial<T> & Pick<T, AlwaysDefinedKeys<T>>

/** Specialized structure transcoder */
export type StructureTranscoder<P> = Transcoder<
  Structure<{ [K in keyof P]: P[K] extends Transcoder<infer T, any> ? T : never }>,
  Structure<{ [K in keyof P]: P[K] extends Transcoder<any, infer E> ? E : never }>>

/** Structure transcoder factory */
export function StructureTranscoder<P extends PropertyTranscoders>(props: P): StructureTranscoder<P> {
  const knownKeys = Object.keys(props)
  const knownKeysMap = knownKeys.reduce((acc, key) => (acc[key] = true, acc), Object.create(null))
  const typeDescription = `{ ${knownKeys.reduce((acc, key) => (acc.push(`${key}: ${props[key].typeDescription}`), acc), [] as string[]).join(', ')} }`
  const encodedTypeDescription = `{ ${knownKeys.reduce((acc, key) => (acc.push(`${key}: ${props[key].encodedTypeDescription}`), acc), [] as string[]).join(', ')} }`

  return {
    tag,
    typeDescription,
    encodedTypeDescription,
    assert(value, options) {
      if (value === null || typeof value !== 'object') {
        return Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
      }

      if (!(options ? options.ignoreExtraOnAssert : defaultCodingOptions.ignoreExtraOnAssert)) {
        const extra = Object.keys(value).find(key => !knownKeysMap[key])
        if (extra) {
          return Promise.reject(new AssertionError({ tag, value, expected: typeDescription }, `Found unknown key ${extra} in structure`))
        }
      }

      return Promise.all(knownKeys.map(key => props[key].assert(value[key], options)))
        .then(() => value)
        .catch(err => Promise.reject(AssertionError.pushContext(err, { tag, expected: typeDescription })))
    },
    decode(value, options) {
      if (value === null || typeof value !== 'object') {
        return Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
      }

      return Promise.all(knownKeys.map(key => props[key].decode(value[key], options)))
        .then(values => values.reduce((acc: any, value, i) => (acc[knownKeys[i]] = value, acc), {}) as any)
        .catch(err => Promise.reject(DecodingError.pushContext(err, { tag, expected: typeDescription })))
    },
    encode(value, options) {
      if (value === null || typeof value !== 'object') {
        return Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
      }

      return Promise.all(knownKeys.map(key => props[key].encode(value[key], options)))
        .then(values => values.reduce((acc: any, value, i) => (acc[knownKeys[i]] = value, acc), {}) as any)
        .catch(err => Promise.reject(EncodingError.pushContext(err, { tag, expected: typeDescription })))
    }
  }
}
