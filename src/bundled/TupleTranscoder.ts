import { Transcoder, defaultCodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'TupleTranscoder'

/** Tuple transcoder factory */
export function TupleTranscoder(): Transcoder<[], []>
export function TupleTranscoder<A1, A2>(a: Transcoder<A1, A2>): Transcoder<[A1], [A2]>
export function TupleTranscoder<A1, A2, B1, B2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>): Transcoder<[A1, B1], [A2, B2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>): Transcoder<[A1, B1, C1], [A2, B2, C2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>): Transcoder<[A1, B1, C1, D1], [A2, B2, C2, D2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>): Transcoder<[A1, B1, C1, D1, E1], [A2, B2, C2, D2, E2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>, f: Transcoder<F1, F2>): Transcoder<[A1, B1, C1, D1, E1, F1], [A2, B2, C2, D2, E2, F2]>
export function TupleTranscoder(...types: Transcoder<any, any>[]): Transcoder<any, any> {
  const typeDescription = `[${types.map(type => type.typeDescription).join(', ')}]`
  const encodedTypeDescription = `[${types.map(type => type.encodedTypeDescription).join(', ')}]`

  return {
    tag,
    typeDescription,
    encodedTypeDescription,
    assert(value, options) {
      if (!Array.isArray(value)) {
        return Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
      }

      if (!(options ? options.ignoreExtraOnAssert : defaultCodingOptions.ignoreExtraOnAssert) &&
          types.length !== value.length) {
          return Promise.reject(new AssertionError(
            { tag, value, expected: typeDescription },
            `Expected a tuple of length ${types.length}, instead found: tupe of length ${value.length}`))
      }

      return Promise.all(types.map((type, i) => type.assert(value[i], options)))
        .then(() => value)
        .catch(err => Promise.reject(AssertionError.pushContext(err, { tag, expected: typeDescription })))
    },
    decode(value, options) {
      return !Array.isArray(value)
        ? Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
        : Promise.all(types.map((type, i) => type.decode(value[i], options)))
            .catch(err => Promise.reject(DecodingError.pushContext(err, { tag, expected: typeDescription })))
    },
    encode(value, options) {
      return !Array.isArray(value)
        ? Promise.reject(new EncodingError({ tag, value, expected: typeDescription }))
        : Promise.all(types.map((type, i) => type.encode(value[i], options)))
          .catch(err => Promise.reject(EncodingError.pushContext(err, { tag, expected: typeDescription })))
    }
  }
}
