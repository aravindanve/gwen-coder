export type AssertionOptions = {
  ignoreExtraOnAssert?: boolean
}

export type DecodingOptions = {
  coerceOnDecode?: boolean,
  coerceNullFromStringOnDecode?: boolean
}

export type EncodingOptions = {}
export type CodingOptions = AssertionOptions & DecodingOptions & EncodingOptions

export interface Transcoder<T, E> {
  readonly tag: string
  readonly typeDescription: string
  readonly encodedTypeDescription: string
  assert(data: T, options?: AssertionOptions): Promise<T>
  decode(data: E, options?: DecodingOptions): Promise<T>
  encode(data: T, options?: EncodingOptions): Promise<E>
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

export const defaultCodingOptions: CodingOptions = {
  ignoreExtraOnAssert: false,
  coerceOnDecode: false,
  coerceNullFromStringOnDecode: false
}
