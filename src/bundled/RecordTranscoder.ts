import { Coder, Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'RecordTranscoder'

/** Specialized record key type */
export type RecordKeyType = string

/** Specialized record type */
export type Record<K, V> =
  K extends string ? { [key: string]: V } :
  never

/** Record transcoder factory */
export const RecordTranscoder = <K extends RecordKeyType, T, E>(keyType: Coder<K>, valueType: Transcoder<T, E>): Transcoder<Record<K, T>, Record<K, E>> => {
  const typeDescription = `{ [key: ${keyType.typeDescription}]: ${valueType.typeDescription} }`
  const encodedTypeDescription = `{ [key: ${keyType.encodedTypeDescription}]: ${valueType.encodedTypeDescription} }`

  return {
    tag,
    typeDescription,
    encodedTypeDescription,
    assert(value, options) {
      if (value === null || typeof value !== 'object') {
        return Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
      }

      const keys = Object.keys(value)
      const kPromises = Promise.all(keys.map(key => keyType.assert(key as any, options)))
      const vPromises = Promise.all(keys.map(key => valueType.assert(value[key], options)))

      return Promise.all([kPromises, vPromises])
        .then(() => value)
        .catch(err => Promise.reject(AssertionError.pushContext(err, { tag, expected: typeDescription })))
    },
    decode(value, options) {
      if (value === null || typeof value !== 'object') {
        return Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
      }

      const keys = Object.keys(value)
      const kPromises = Promise.all(keys.map(key => keyType.decode(key as any, options)))
      const vPromises = Promise.all(keys.map(key => valueType.decode(value[key], options)))

      return Promise.all([kPromises, vPromises])
        .then(([keys, values]) => keys.reduce((acc, key, i) => (acc[key] = values[i], acc), {} as any))
        .catch(err => Promise.reject(DecodingError.pushContext(err, { tag, expected: typeDescription })))
    },
    encode(value, options) {
      if (value === null || typeof value !== 'object') {
        return Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
      }

      const keys = Object.keys(value)
      const kPromises = Promise.all(keys.map(key => keyType.encode(key as any, options)))
      const vPromises = Promise.all(keys.map(key => valueType.encode(value[key], options)))

      return Promise.all([kPromises, vPromises])
        .then(([keys, values]) => keys.reduce((acc, key, i) => (acc[key] = values[i], acc), {} as any))
        .catch(err => Promise.reject(EncodingError.pushContext(err, { tag, expected: typeDescription })))
    }
  }
}
