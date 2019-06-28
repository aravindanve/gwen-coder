import { Strainer, Decoder, Encoder, Coder } from '../Coder'

/** Runtime cast to optional type */
export function asOptionalType<T, U>(value: T | undefined, fn: (value: T) => U | Promise<U>): (U | undefined) | Promise<U | undefined> {
  if (value === undefined) {
    return

  } else {
    return fn(value)
  }
}

/** Optional Strainer Factory */
export const OptionalStrainer = <D, E>(type: Strainer<D, E>): Strainer<D | undefined, E | undefined> => ({
  asDecodeType: value => asOptionalType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asOptionalType(value, value => type.asEncodeType(value)),
})

/** Optional Decoder Factory */
export const OptionalDecoder = <D, E>(type: Decoder<D, E>): Decoder<D | undefined, E | undefined> => ({
  asDecodeType: value => asOptionalType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asOptionalType(value, value => type.asEncodeType(value)),
  decode: value => asOptionalType(value, value => type.decode(value))
})

/** Optional Encoder Factory */
export const OptionalEncoder = <D, E>(type: Encoder<D, E>): Encoder<D | undefined, E | undefined> => ({
  asDecodeType: value => asOptionalType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asOptionalType(value, value => type.asEncodeType(value)),
  encode: value => asOptionalType(value, value => type.encode(value))
})

/** Optional Coder Factory */
export const OptionalCoder = <D, E>(type: Coder<D, E>): Coder<D | undefined, E | undefined> => ({
  asDecodeType: value => asOptionalType(value, value => type.asDecodeType(value)),
  asEncodeType: value => asOptionalType(value, value => type.asEncodeType(value)),
  decode: value => asOptionalType(value, value => type.decode(value)),
  encode: value => asOptionalType(value, value => type.encode(value))
})
