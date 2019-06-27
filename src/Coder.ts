/** Decodes type T <- S */
export interface Decoder<T, S> {
  decode(value: S): T | Promise<T>
}

/** Encodes type T -> S */
export interface Encoder<T, S> {
  encode(value: T): S | Promise<S>
}

/** Decodes type T <- S and Encodes type T -> S  */
export interface Coder<T, S> extends Decoder<T, S>, Encoder<T, S> { }

/** Target Type of Coder, Decoder, Encoder */
export type TargetType<C> =
  C extends Coder<infer T, any> ? T :
  C extends Decoder<infer T, any> ? T :
  C extends Encoder<infer T, any> ? T : never

/** Source Type of Coder, Decoder, Encoder */
export type SourceType<C> =
  C extends Coder<any, infer T> ? T :
  C extends Decoder<any, infer T> ? T :
  C extends Encoder<any, infer T> ? T : never
