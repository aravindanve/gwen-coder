import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/* Runtime cast to Date type */
export function toDateType(value: string | Date): Date {
  const date = new Date(value)
  if (!isNaN(date as any)) {
    return date
  }

  throw CodingError.new(`Could not convert value ${value} to Date`)
}

/* Runtime cast to date-time string type */
export function toDateTimeStringType(value: string | Date): string {
  try {
    return new Date(value).toISOString()

  } catch {
    throw CodingError.new(`Could not convert value ${value} to date-time string`)
  }
}

/* Date Strainer Factory */
export const DateStrainer = (): Strainer<Date, string> => ({
  asDecodeType: toDateType,
  asEncodeType: toDateTimeStringType
})

/* Date Decoder Factory */
export const DateDecoder = (): Decoder<Date, string> => ({
  ...DateStrainer(),
  decode: toDateType
})

/* Date Encoder Factory */
export const DateEncoder = (): Encoder<Date, string> => ({
  ...DateStrainer(),
  encode: toDateTimeStringType
})

/* Date Coder Factory */
export const DateCoder = (): Coder<Date, string> => ({
  ...DateDecoder(),
  ...DateEncoder()
})
