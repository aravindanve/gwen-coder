import { Strainer, Decoder, Encoder, Coder } from '../Coder'

/** Internal */
async function mapIntersection<C, T>(ifaces: C[], value: T, fn: (iface: C, value: T) => any): Promise<T> {
  let promise: Promise<any> = Promise.resolve()
  for (const iface of ifaces) {
    promise = promise.then(() => fn(iface, value))
  }

  return promise
}

/** Intersection Strainer Factory */
export function IntersectionStrainer<A1, A2, B1, B2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>): Strainer<A1 & A2, B1 & B2>
export function IntersectionStrainer<A1, A2, B1, B2, C1, C2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>): Strainer<A1 & B1 & C1, A2 & B2 & C2>
export function IntersectionStrainer<A1, A2, B1, B2, C1, C2, D1, D2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>, d: Strainer<D1, D2>): Strainer<A1 & B1 & C1 & D1, A2 & B2 & C2 & D2>
export function IntersectionStrainer<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>, d: Strainer<D1, D2>, e: Strainer<E1, E2>): Strainer<A1 & B1 & C1 & D1 & E1, A2 & B2 & C2 & D2 & E2>
export function IntersectionStrainer<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Strainer<A1, A1>, b: Strainer<B1, B2>, c: Strainer<C1, C2>, d: Strainer<D1, D2>, e: Strainer<E1, E2>, f: Strainer<F1, F2>): Strainer<A1 & B1 & C1 & D1 & E1 & F1, A2 & B2 & C2 & D2 & E2 & F2>
export function IntersectionStrainer(...args: Strainer<any, any>[]): Strainer<any, any> {
  return {
    asDecodeType: value => mapIntersection(args, value, strainer => strainer.asDecodeType(value)),
    asEncodeType: value => mapIntersection(args, value, strainer => strainer.asEncodeType(value))
  }
}

/** Intersection Decoder Factory */
export function IntersectionDecoder<A1, A2, B1, B2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>): Decoder<A1 & A2, B1 & B2>
export function IntersectionDecoder<A1, A2, B1, B2, C1, C2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>): Decoder<A1 & B1 & C1, A2 & B2 & C2>
export function IntersectionDecoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>, d: Decoder<D1, D2>): Decoder<A1 & B1 & C1 & D1, A2 & B2 & C2 & D2>
export function IntersectionDecoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>, d: Decoder<D1, D2>, e: Decoder<E1, E2>): Decoder<A1 & B1 & C1 & D1 & E1, A2 & B2 & C2 & D2 & E2>
export function IntersectionDecoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Decoder<A1, A1>, b: Decoder<B1, B2>, c: Decoder<C1, C2>, d: Decoder<D1, D2>, e: Decoder<E1, E2>, f: Decoder<F1, F2>): Decoder<A1 & B1 & C1 & D1 & E1 & F1, A2 & B2 & C2 & D2 & E2 & F2>
export function IntersectionDecoder(...args: Decoder<any, any>[]): Decoder<any, any> {
  return {
    asDecodeType: value => mapIntersection(args, value, decoder => decoder.asDecodeType(value)),
    asEncodeType: value => mapIntersection(args, value, decoder => decoder.asEncodeType(value)),
    decode: value => mapIntersection(args, value, decoder => decoder.decode(value))
  }
}

/** Intersection Encoder Factory */
export function IntersectionEncoder<A1, A2, B1, B2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>): Encoder<A1 & A2, B1 & B2>
export function IntersectionEncoder<A1, A2, B1, B2, C1, C2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>): Encoder<A1 & B1 & C1, A2 & B2 & C2>
export function IntersectionEncoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>, d: Encoder<D1, D2>): Encoder<A1 & B1 & C1 & D1, A2 & B2 & C2 & D2>
export function IntersectionEncoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>, d: Encoder<D1, D2>, e: Encoder<E1, E2>): Encoder<A1 & B1 & C1 & D1 & E1, A2 & B2 & C2 & D2 & E2>
export function IntersectionEncoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Encoder<A1, A1>, b: Encoder<B1, B2>, c: Encoder<C1, C2>, d: Encoder<D1, D2>, e: Encoder<E1, E2>, f: Encoder<F1, F2>): Encoder<A1 & B1 & C1 & D1 & E1 & F1, A2 & B2 & C2 & D2 & E2 & F2>
export function IntersectionEncoder(...args: Encoder<any, any>[]): Encoder<any, any> {
  return {
    asDecodeType: value => mapIntersection(args, value, encoder => encoder.asDecodeType(value)),
    asEncodeType: value => mapIntersection(args, value, encoder => encoder.asEncodeType(value)),
    encode: value => mapIntersection(args, value, encoder => encoder.encode(value))
  }
}

/** Intersection Coder Factory */
export function IntersectionCoder<A1, A2, B1, B2>(a: Coder<A1, A1>, b: Coder<B1, B2>): Coder<A1 & A2, B1 & B2>
export function IntersectionCoder<A1, A2, B1, B2, C1, C2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>): Coder<A1 & B1 & C1, A2 & B2 & C2>
export function IntersectionCoder<A1, A2, B1, B2, C1, C2, D1, D2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>, d: Coder<D1, D2>): Coder<A1 & B1 & C1 & D1, A2 & B2 & C2 & D2>
export function IntersectionCoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>, d: Coder<D1, D2>, e: Coder<E1, E2>): Coder<A1 & B1 & C1 & D1 & E1, A2 & B2 & C2 & D2 & E2>
export function IntersectionCoder<A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2>(a: Coder<A1, A1>, b: Coder<B1, B2>, c: Coder<C1, C2>, d: Coder<D1, D2>, e: Coder<E1, E2>, f: Coder<F1, F2>): Coder<A1 & B1 & C1 & D1 & E1 & F1, A2 & B2 & C2 & D2 & E2 & F2>
export function IntersectionCoder(...args: Coder<any, any>[]): Coder<any, any> {
  return {
    asDecodeType: value => mapIntersection(args, value, coder => coder.asDecodeType(value)),
    asEncodeType: value => mapIntersection(args, value, coder => coder.asEncodeType(value)),
    decode: value => mapIntersection(args, value, coder => coder.decode(value)),
    encode: value => mapIntersection(args, value, coder => coder.encode(value))
  }
}
