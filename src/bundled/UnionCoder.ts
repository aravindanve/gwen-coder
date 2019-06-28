import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/** Internal */
async function mapUnion<C, T>(ifaces: C[], value: T, fn: (iface: C, value: T) => any): Promise<T> {
  let promise: Promise<any> = Promise.reject(CodingError.new(`Could not convert value ${value}`))
  for (const iface of ifaces) {
    promise = promise.catch(() => fn(iface, value))
  }

  return promise
}

/** Union Strainer Factory */
export function UnionStrainer<A1, A2, B1, B2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>): Strainer<A1 | A2, B1 | B2>
export function UnionStrainer<A1, A2, B1, B2, C1, C2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>): Strainer<A1 | B1 | C1, A2 | B2 | C2>
export function UnionStrainer<A1, A2, B1, B2, C1, C2, D1, D2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>, d: Strainer<D1, D2>): Strainer<A1 | B1 | C1 | D1, A2 | B2 | C2 | D2>
export function UnionStrainer<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>, d: Strainer<D1, D2>, e: Strainer<E1, E2>): Strainer<A1 | B1 | C1 | D1 | E1, A2 | B2 | C2 | D2 | E2>
export function UnionStrainer<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>, d: Strainer<D1, D2>, e: Strainer<E1, E2>, f: Strainer<F1, F2>): Strainer<A1 | B1 | C1 | D1 | E1 | F1, A2 | B2 | C2 | D2 | E2 | F2>
export function UnionStrainer(...types: Strainer<any, any>[]): Strainer<any, any> {
  return {
    asDecodeType: value => mapUnion(types, value, strainer => strainer.asDecodeType(value)),
    asEncodeType: value => mapUnion(types, value, strainer => strainer.asEncodeType(value))
  }
}

/** Union Decoder Factory */
export function UnionDecoder<A1, A2, B1, B2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>): Decoder<A1 | A2, B1 | B2>
export function UnionDecoder<A1, A2, B1, B2, C1, C2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>): Decoder<A1 | B1 | C1, A2 | B2 | C2>
export function UnionDecoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>, d: Decoder<D1, D2>): Decoder<A1 | B1 | C1 | D1, A2 | B2 | C2 | D2>
export function UnionDecoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>, d: Decoder<D1, D2>, e: Decoder<E1, E2>): Decoder<A1 | B1 | C1 | D1 | E1, A2 | B2 | C2 | D2 | E2>
export function UnionDecoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>, d: Decoder<D1, D2>, e: Decoder<E1, E2>, f: Decoder<F1, F2>): Decoder<A1 | B1 | C1 | D1 | E1 | F1, A2 | B2 | C2 | D2 | E2 | F2>
export function UnionDecoder(...types: Decoder<any, any>[]): Decoder<any, any> {
  return {
    asDecodeType: value => mapUnion(types, value, decoder => decoder.asDecodeType(value)),
    asEncodeType: value => mapUnion(types, value, decoder => decoder.asEncodeType(value)),
    decode: value => mapUnion(types, value, decoder => decoder.decode(value))
  }
}

/** Union Encoder Factory */
export function UnionEncoder<A1, A2, B1, B2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>): Encoder<A1 | A2, B1 | B2>
export function UnionEncoder<A1, A2, B1, B2, C1, C2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>): Encoder<A1 | B1 | C1, A2 | B2 | C2>
export function UnionEncoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>, d: Encoder<D1, D2>): Encoder<A1 | B1 | C1 | D1, A2 | B2 | C2 | D2>
export function UnionEncoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>, d: Encoder<D1, D2>, e: Encoder<E1, E2>): Encoder<A1 | B1 | C1 | D1 | E1, A2 | B2 | C2 | D2 | E2>
export function UnionEncoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>, d: Encoder<D1, D2>, e: Encoder<E1, E2>, f: Encoder<F1, F2>): Encoder<A1 | B1 | C1 | D1 | E1 | F1, A2 | B2 | C2 | D2 | E2 | F2>
export function UnionEncoder(...types: Encoder<any, any>[]): Encoder<any, any> {
  return {
    asDecodeType: value => mapUnion(types, value, encoder => encoder.asDecodeType(value)),
    asEncodeType: value => mapUnion(types, value, encoder => encoder.asEncodeType(value)),
    encode: value => mapUnion(types, value, encoder => encoder.encode(value))
  }
}

/** Union Coder Factory */
export function UnionCoder<A1, A2, B1, B2>(a: Coder<A1, A1>, b: Coder<B1, B2>): Coder<A1 | A2, B1 | B2>
export function UnionCoder<A1, A2, B1, B2, C1, C2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>): Coder<A1 | B1 | C1, A2 | B2 | C2>
export function UnionCoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>, d: Coder<D1, D2>): Coder<A1 | B1 | C1 | D1, A2 | B2 | C2 | D2>
export function UnionCoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>, d: Coder<D1, D2>, e: Coder<E1, E2>): Coder<A1 | B1 | C1 | D1 | E1, A2 | B2 | C2 | D2 | E2>
export function UnionCoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>, d: Coder<D1, D2>, e: Coder<E1, E2>, f: Coder<F1, F2>): Coder<A1 | B1 | C1 | D1 | E1 | F1, A2 | B2 | C2 | D2 | E2 | F2>
export function UnionCoder(...types: Coder<any, any>[]): Coder<any, any> {
  return {
    asDecodeType: value => mapUnion(types, value, coder => coder.asDecodeType(value)),
    asEncodeType: value => mapUnion(types, value, coder => coder.asEncodeType(value)),
    decode: value => mapUnion(types, value, coder => coder.decode(value)),
    encode: value => mapUnion(types, value, coder => coder.encode(value))
  }
}
