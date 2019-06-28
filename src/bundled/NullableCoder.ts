import { Strainer, Decoder, Encoder, Coder } from '../Coder'

/** Runtime cast to nullable type */
export function asNullableType<T, U>(value: T | null, fn: (value: T) => U | Promise<U>): (U | null) | Promise<U | null> {
  if (value === null) {
    return null

  } else {
    return fn(value)
  }
}

/** Nullable Strainer Factory */
export const NullableStrainer = <D, E>(type: Strainer<D, E>): Strainer<D | null, E | null> => ({
  asDecodeType: value => asNullableType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asNullableType(value, value => type.asEncodeType(value)),
})

/** Nullable Decoder Factory */
export const NullableDecoder = <D, E>(type: Decoder<D, E>): Decoder<D | null, E | null> => ({
  asDecodeType: value => asNullableType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asNullableType(value, value => type.asEncodeType(value)),
  decode: value => asNullableType(value, value => type.decode(value))
})

/** Nullable Encoder Factory */
export const NullableEncoder = <D, E>(type: Encoder<D, E>): Encoder<D | null, E | null> => ({
  asDecodeType: value => asNullableType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asNullableType(value, value => type.asEncodeType(value)),
  encode: value => asNullableType(value, value => type.encode(value))
})

/** Nullable Coder Factory */
export const NullableCoder = <D, E>(type: Coder<D, E>): Coder<D | null, E | null> => ({
  asDecodeType: value => asNullableType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asNullableType(value, value => type.asEncodeType(value)),
  decode: value => asNullableType(value, value => type.decode(value)),
  encode: value => asNullableType(value, value => type.encode(value))
})
