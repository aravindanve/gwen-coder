import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { defaultCodingOptions } from '../defaults'

/** Tuple Transcoder Factory */
export function TupleTranscoder(): Transcoder<[], []>
export function TupleTranscoder<A1, A2>(a: Transcoder<A1, A2>): Transcoder<[A1], [A2]>
export function TupleTranscoder<A1, A2, B1, B2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>): Transcoder<[A1, B1], [A2, B2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>): Transcoder<[A1, B1, C1], [A2, B2, C2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>): Transcoder<[A1, B1, C1, D1], [A2, B2, C2, D2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>): Transcoder<[A1, B1, C1, D1, E1], [A2, B2, C2, D2, E2]>
export function TupleTranscoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Transcoder<A1, A2>, b: Transcoder<B1, B2>, c: Transcoder<C1, C2>, d: Transcoder<D1, D2>, e: Transcoder<E1, E2>, f: Transcoder<F1, F2>): Transcoder<[A1, B1, C1, D1, E1, F1], [A2, B2, C2, D2, E2, F2]>
export function TupleTranscoder(...types: Transcoder<any, any>[]): Transcoder<any, any> {
  return {
    async assert(data, options) {
      if (!Array.isArray(data)) {
        throw AssertionError.new(`Expected ${data} to be array`)
      }

      if (!(options ? options.ignoreExtraOnAssert : defaultCodingOptions.ignoreExtraOnAssert)) {
        if (types.length !== data.length) {
          throw AssertionError.new(`Expected ${types.length} but found ${data.length} items in tuple`)
        }
      }

      for (const [key, type] of types.entries()) {
        try {
          await type.assert(data[key], options)

        } catch (err) {
          throw AssertionError.pushContext(err, { key, ref: this })
        }
      }

      return data
    },
    async decode(data, options) {
      if (!Array.isArray(data)) {
        throw DecodingError.new(`Could not decode data ${data} as array`)
      }

      const result = []
      for (const [key, type] of types.entries()) {
        try {
          result.push(await type.decode(data[key], options))

        } catch (err) {
          throw DecodingError.pushContext(err, { key, ref: this })
        }
      }

      return result
    },
    async encode(data, options) {
      if (!Array.isArray(data)) {
        throw EncodingError.new(`Could not encode data ${data} to array`)
      }

      const result = []
      for (const [key, type] of types.entries()) {
        try {
          result.push(await type.encode(data[key], options))

        } catch (err) {
          throw EncodingError.pushContext(err, { key, ref: this })
        }
      }

      return result
    }
  }
}
