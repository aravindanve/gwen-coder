import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/** Runtime cast to undefined type */
export function asUndefinedType(value: undefined): undefined {
  if (value === undefined) {
    return value
  }

  throw CodingError.new(`Could not convert value ${value} to undefined`)
}

/** Undefined Strainer Factory */
export const UndefinedStrainer = (): Strainer<undefined, undefined> => ({
  asDecodeType: asUndefinedType,
  asEncodeType: asUndefinedType
})

/** Undefined Decoder Factory */
export const UndefinedDecoder = (): Decoder<undefined, undefined> => ({
  asDecodeType: asUndefinedType,
  asEncodeType: asUndefinedType,
  decode: asUndefinedType
})

/** Undefined Encoder Factory */
export const UndefinedEncoder = (): Encoder<undefined, undefined> => ({
  asDecodeType: asUndefinedType,
  asEncodeType: asUndefinedType,
  encode: asUndefinedType
})

/** Undefined Coder Factory */
export const UndefinedCoder = (): Coder<undefined, undefined> => ({
  asDecodeType: asUndefinedType,
  asEncodeType: asUndefinedType,
  decode: asUndefinedType,
  encode: asUndefinedType
})
