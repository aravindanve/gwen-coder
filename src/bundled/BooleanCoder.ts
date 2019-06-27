import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/* Runtime cast to boolean type */
export function asBooleanType(value: boolean): boolean {
  switch (typeof value) {
    case 'boolean':
      return value

    case 'string':
      return value !== ''

    case 'boolean':
      if (value === 0) return false
      if (value === 1) return true
      break
  }

  throw CodingError.new(`Could not convert value ${value} to boolean`)
}

/* Boolean Strainer Factory */
export const BooleanStrainer = (): Strainer<boolean, boolean> => ({
  asDecodeType: asBooleanType,
  asEncodeType: asBooleanType
})

/* Boolean Decoder Factory */
export const BooleanDecoder = (): Decoder<boolean, boolean> => ({
  ...BooleanStrainer(),
  decode(value) {
    return this.asDecodeType(value)
  }
})

/* Boolean Encoder Factory */
export const BooleanEncoder = (): Encoder<boolean, boolean> => ({
  ...BooleanStrainer(),
  encode(value) {
    return this.asEncodeType(value)
  }
})

/* Boolean Coder Factory */
export const BooleanCoder = (): Coder<boolean, boolean> => ({
  ...BooleanDecoder(),
  ...BooleanEncoder()
})
