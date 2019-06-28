import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/** Runtime cast to array type */
export function asArrayType<T>(value: T[]): T[] {
  if (Array.isArray(value)) {
    return value
  }

  throw CodingError.new(`Could not convert value ${value} to array`)
}

/** Internal */
async function mapArray<I, O>(ref: any, array: I[], fn: (value: I, index: number) => O | Promise<O>) {
  asArrayType(array)

  let result = []
  let lastKey!: number
  try {
    for (const [key, value] of array.entries()) {
      lastKey = key
      result[key] = await fn(value, key)
    }

  } catch (err) {
    throw CodingError.pushContext(err, { key: lastKey, ref })
  }

  return result
}

/** Array Strainer Factory */
export const ArrayStrainer = <D, E>(type: Strainer<D, E>): Strainer<D[], E[]> => ({
  asDecodeType(value) {
    return mapArray(ArrayStrainer, value, item => type.asDecodeType(item))
  },
  asEncodeType(value) {
    return mapArray(ArrayStrainer, value, item => type.asEncodeType(item))
  }
})

/** Array Decoder Factory */
export const ArrayDecoder = <D, E>(type: Decoder<D, E>): Decoder<D[], E[]> => ({
  ...ArrayStrainer(type),
  decode(value) {
    return mapArray(ArrayDecoder, value, item => type.decode(item))
  }
})

/** Array Encoder Factory */
export const ArrayEncoder = <D, E>(type: Encoder<D, E>): Encoder<D[], E[]> => ({
  ...ArrayStrainer(type),
  encode(value) {
    return mapArray(ArrayEncoder, value, item => type.encode(item))
  }
})

/** Array Coder Factory */
export const ArrayCoder = <D, E>(type: Coder<D, E>): Coder<D[], E[]> => ({
  ...ArrayDecoder(type),
  ...ArrayEncoder(type)
})
