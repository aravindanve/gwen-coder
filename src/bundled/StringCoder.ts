import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/* Runtime cast to string type */
export function asStringType(value: string): string {
  switch (typeof value) {
    case 'string':
      return value

    case 'number':
      return '' + value
  }

  throw CodingError.new(`Could not convert value ${value} to string`)
}

/* String Strainer Factory */
export const StringStrainer = (): Strainer<string, string> => ({
  asDecodeType: asStringType,
  asEncodeType: asStringType
})

/* String Decoder Factory */
export const StringDecoder = (): Decoder<string, string> => ({
  ...StringStrainer(),
  decode(value) {
    return this.asDecodeType(value)
  }
})

/* String Encoder Factory */
export const StringEncoder = (): Encoder<string, string> => ({
  ...StringStrainer(),
  encode(value) {
    return this.asEncodeType(value)
  }
})

/* String Coder Factory */
export const StringCoder = (): Coder<string, string> => ({
  ...StringDecoder(),
  ...StringEncoder()
})
