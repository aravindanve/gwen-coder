import { Transcoder } from '../shared'

/** Intersection Transcoder Factory */
export function IntersectionTranscoder<A1, A2, B1, B2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>): Transcoder<A1 & B1, A2 & B2>
export function IntersectionTranscoder<A1, A2, B1, B2, C1, C2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>): Transcoder<A1 & B1 & C1, A2 & B2 & C2>
export function IntersectionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>): Transcoder<A1 & B1 & C1 & D1, A2 & B2 & C2 & D2>
export function IntersectionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>): Transcoder<A1 & B1 & C1 & D1 & E1, A2 & B2 & C2 & D2 & E2>
export function IntersectionTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>, f: Transcoder<F1, F2>): Transcoder<A1 & B1 & C1 & D1 & E1 & F1, A2 & B2 & C2 & D2 & E2 & F2>
export function IntersectionTranscoder(...types: Transcoder<any, any>[]): Transcoder<any, any> {
  return {
    codingOptions: {},
    pipe(data) {
      let promise: Promise<any> = Promise.resolve()
      for (const type of types) {
        promise = promise.then(() => type.pipe(data))
      }

      return promise
    },
    decode(data) {
      let promise: Promise<any> = Promise.resolve()
      for (const type of types) {
        promise = promise.then(() => type.decode(data))
      }

      return promise
    },
    encode(data) {
      let promise: Promise<any> = Promise.resolve()
      for (const type of types) {
        promise = promise.then(() => type.encode(data))
      }

      return promise
    }
  }
}
