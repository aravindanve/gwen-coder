import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/* Runtime cast to number type */
export function asNumberType(value: number): number {
  switch (typeof value) {
    case 'number':
      return value

    case 'string':
      if (!isNaN(+value)) {
        return +value
      }
  }

  throw CodingError.new(`Could not convert value ${value} to number`)
}

/* Number Strainer Factory */
export const NumberStrainer = (): Strainer<number, number> => ({
  asDecodeType: asNumberType,
  asEncodeType: asNumberType
})

/* Number Decoder Factory */
export const NumberDecoder = (): Decoder<number, number> => ({
  ...NumberStrainer(),
  decode(value) {
    return this.asDecodeType(value)
  }
})

/* Number Encoder Factory */
export const NumberEncoder = (): Encoder<number, number> => ({
  ...NumberStrainer(),
  encode(value) {
    return this.asEncodeType(value)
  }
})

/* Number Coder Factory */
export const NumberCoder = (): Coder<number, number> => ({
  ...NumberDecoder(),
  ...NumberEncoder()
})
