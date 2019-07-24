export type PipeOptions = {
  ignoreExtraOnPipe?: boolean
}

export type DecodingOptions = {
  coerceOnDecode?: boolean,
  coerceNullFromStringOnDecode?: boolean
}

export type EncodingOptions = {}
export type CodingOptions = PipeOptions & DecodingOptions & EncodingOptions

export interface Transcoder<T, E> {
  pipe(data: T, options?: PipeOptions): T | Promise<T>
  decode(data: E, options?: DecodingOptions): T | Promise<T>
  encode(data: T, options?: EncodingOptions): E | Promise<E>
}

export type Coder<T> = Transcoder<T, T>

export type Type<C> =
  C extends Coder<infer T1> ? T1 :
  C extends Transcoder<infer T2, any> ? T2 :
  never

export type EncodedType<C> =
  C extends Coder<infer E1> ? E1 :
  C extends Transcoder<any, infer E2> ? E2 :
  never

export function Transcoder<T, E>(transcoder: Transcoder<T, E>): Transcoder<T, E> {
  return transcoder
}

export function Coder<T, E>(coder: Coder<T>): Coder<T> {
  return coder
}
