import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'UnionTranscoder'

/** Union transcoder factory */
export function UnionTranscoder<A1, A2, B1, B2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>): Transcoder<A1 | B1, A2 | B2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>): Transcoder<A1 | B1 | C1, A2 | B2 | C2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>): Transcoder<A1 | B1 | C1 | D1, A2 | B2 | C2 | D2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>): Transcoder<A1 | B1 | C1 | D1 | E1, A2 | B2 | C2 | D2 | E2>
export function UnionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>, f: Transcoder<F1, F2>): Transcoder<A1 | B1 | C1 | D1 | E1 | F1, A2 | B2 | C2 | D2 | E2 | F2>
export function UnionTranscoder(...types: Transcoder<any, any>[]): Transcoder<any, any> {
  if (types.length < 2) throw TypeError('UnionTranscoder expects at least 2 arguments')
  const typeDescription = types.map(type => type.typeDescription).join(' | ')
  const encodedTypeDescription = types.map(type => type.encodedTypeDescription).join(' | ')
  const count = types.length

  return {
    tag,
    typeDescription,
    encodedTypeDescription,
    assert(value, options) {
      let promise: Promise<any> = Promise.reject()
      for (let i = 0; i < count; i++) {
        promise = promise.catch(() => types[i].assert(value, options))
      }
      return promise.catch(err => Promise.reject(AssertionError.pushContext(err, { tag, expected: typeDescription })))
    },
    decode(value, options) {
      let promise: Promise<any> = Promise.reject()
      for (let i = 0; i < count; i++) {
        promise = promise.catch(() => types[i].decode(value, options))
      }
      return promise.catch(err => Promise.reject(DecodingError.pushContext(err, { tag, expected: typeDescription })))
    },
    encode(value, options) {
      let promise: Promise<any> = Promise.reject()
      for (let i = 0; i < count; i++) {
        promise = promise.catch(() => types[i].encode(value, options))
      }
      return promise.catch(err => Promise.reject(EncodingError.pushContext(err, { tag, expected: encodedTypeDescription })))
    }
  }
}
