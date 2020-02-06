import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'ListTranscoder'

/** List transcoder factory */
export const ListTranscoder = <T, E>(type: Transcoder < T, E >): Transcoder<T[], E[]> => {
  const typeDescription = `Array<${type.typeDescription}>`
  const encodedTypeDescription = `Array<${type.encodedTypeDescription}>`

  return {
    tag,
    typeDescription,
    encodedTypeDescription,
    assert(value, options) {
      return !Array.isArray(value)
        ? Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
        : Promise.all(value.map((_value, i) => type.assert(_value, options)
            .catch(err => Promise.reject(AssertionError.pushContext(err, { tag, key: i, expected: typeDescription })))))
            .then(() => value)
    },
    decode(value, options) {
      return !Array.isArray(value)
        ? Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
        : Promise.all(value.map((_value, i) => type.decode(_value, options)
            .catch(err => Promise.reject(DecodingError.pushContext(err, { tag, key: i, expected: typeDescription })))))
    },
    encode(value, options) {
      return !Array.isArray(value)
        ? Promise.reject(new EncodingError({ tag, value, expected: encodedTypeDescription }))
        : Promise.all(value.map((_value, i) => type.encode(_value, options)
          .catch(err => Promise.reject(EncodingError.pushContext(err, { tag, key: i, expected: encodedTypeDescription })))))
    }
  }
}
