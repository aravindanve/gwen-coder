import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** Union Transcoder Factory */
export function UnionTranscoder<A1, A2, B1, B2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>): Transcoder<A1 | B1, A2 | B2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>): Transcoder<A1 | B1 | C1, A2 | B2 | C2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>): Transcoder<A1 | B1 | C1 | D1, A2 | B2 | C2 | D2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>): Transcoder<A1 | B1 | C1 | D1 | E1, A2 | B2 | C2 | D2 | E2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>, f: Transcoder<F1, F2>): Transcoder<A1 | B1 | C1 | D1 | E1 | F1, A2 | B2 | C2 | D2 | E2 | F2>
export function UnionTranscoder(...types: Transcoder<any, any>[]): Transcoder<any, any> {
  return {
    assert(data, options) {
      let promise: Promise<any> = Promise.reject(AssertionError.new(`Unexpected data ${data}`))
      for (const type of types) {
        promise = promise.catch(() => type.assert(data, options))
      }

      return promise
    },
    decode(data, options) {
      let promise: Promise<any> = Promise.reject(DecodingError.new(`Could not decode data ${data}`))
      for (const type of types) {
        promise = promise.catch(() => type.decode(data, options))
      }

      return promise
    },
    encode(data, options) {
      let promise: Promise<any> = Promise.reject(EncodingError.new(`Could not encode data ${data}`))
      for (const type of types) {
        promise = promise.catch(() => type.encode(data, options))
      }

      return promise
    }
  }
}
