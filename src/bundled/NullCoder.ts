import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/* Runtime cast to null type */
export function asNullType(value: null): null {
  if (value === null) {
    return value
  }

  throw CodingError.new(`Could not convert value ${value} to null`)
}

/* Null Strainer Factory */
export const NullStrainer = (): Strainer<null, null> => ({
  asDecodeType: asNullType,
  asEncodeType: asNullType
})

/* Null Decoder Factory */
export const NullDecoder = (): Decoder<null, null> => ({
  ...NullStrainer(),
  decode(value) {
    return this.asDecodeType(value)
  }
})

/* Null Encoder Factory */
export const NullEncoder = (): Encoder<null, null> => ({
  ...NullStrainer(),
  encode(value) {
    return this.asEncodeType(value)
  }
})

/* Null Coder Factory */
export const NullCoder = (): Coder<null, null> => ({
  ...NullDecoder(),
  ...NullEncoder()
})
