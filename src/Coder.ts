/** Strainer Interface */
export interface Strainer<D, E> {
  asDecodeType(value: D): D | Promise<D>
  asEncodeType(value: E): E | Promise<E>
}

/** Decoder Interface */
export interface Decoder<D, E> extends Strainer<D, E> {
  decode(value: E): D | Promise<D>
}

/** Encoder Interface */
export interface Encoder<D, E> extends Strainer<D, E> {
  encode(value: D): E | Promise<E>
}

/** Decoder and Encoder Interface  */
export interface Coder<T, S> extends Decoder<T, S>, Encoder<T, S> { }

/** Extracts Decode Type */
export type DecodeType<T> =
  T extends Coder<infer D, any> ? D :
  T extends Decoder<infer D, any> ? D :
  T extends Encoder<infer D, any> ? D :
  T extends Strainer<infer D, any> ? D : never

/** Extracts Encode Type */
export type EncodeType<T> =
  T extends Coder<any, infer E> ? E :
  T extends Decoder<any, infer E> ? E :
  T extends Encoder<any, infer E> ? E :
  T extends Strainer<any, infer E> ? E : never
