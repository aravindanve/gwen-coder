import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/* Runtime cast to array type */
export function asArrayType<T>(value: T[]): T[] {
  if (Array.isArray(value)) {
    return value
  }

  throw CodingError.new(`Could not convert value ${value} to array`)
}

/* Array Strainer Factory */
export const ArrayStrainer = <D, E>(item: Strainer<D, E>): Strainer<D[], E[]> => ({
  asDecodeType(value) {
    return Promise.all(value.map(_item => item.asDecodeType(_item)))
  },
  asEncodeType(value) {
    return Promise.all(value.map(_item => item.asEncodeType(_item)))
  }
})

/* Array Decoder Factory */
export const ArrayDecoder = <D, E>(item: Decoder<D, E>): Decoder<D[], E[]> => ({
  ...ArrayStrainer(item),
  decode(value) {
    return Promise.all(asArrayType(value).map(_item => item.decode(_item)))
  }
})

/* Array Encoder Factory */
export const ArrayEncoder = <D, E>(item: Encoder<D, E>): Encoder<D[], E[]> => ({
  ...ArrayStrainer(item),
  encode(value) {
    return Promise.all(asArrayType(value).map(_item => item.encode(_item)))
  }
})

/* Array Coder Factory */
export const ArrayCoder = <D, E>(item: Coder<D, E>): Coder<D[], E[]> => ({
  ...ArrayDecoder(item),
  ...ArrayEncoder(item)
})
