import { Strainer, Decoder, Encoder, Coder } from '../Coder'
import { CodingError } from '../CodingError'

/** Runtime cast to object type */
export function asObjectType<T extends {}>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    return value
  }

  throw CodingError.new(`Could not convert value ${value} to object`)
}

/** Internal */
async function mapProperties<P, I>(ref: any, properties: P, input: I, fn: <K extends (keyof P & keyof I)>(leftValue: P[K], rightValue: I[K]) => any | Promise<any>): Promise<any> {
  asObjectType(mapProperties)
  asObjectType(input)

  let result = {}
  let lastKey!: string
  try {
    for (const [key, value] of Object.entries(properties)) {
      lastKey = key
      result[key] = await fn(value, input[key])
    }

  } catch (err) {
    throw CodingError.pushContext(err, { key: lastKey, ref })
  }

  return result
}

/** Object keyed map of property strainers */
export type PropertyStrainers = {
  [key: string]: Strainer<unknown, unknown>
}

/** Specialized object strainer */
export type ObjectStrainer<P> = Strainer<
  { [K in keyof P]: P[K] extends Strainer<infer D, any> ? D : never },
  { [K in keyof P]: P[K] extends Strainer<any, infer E> ? E : never }>

/** Object Strainer Factory */
export const ObjectStrainer = <P extends PropertyStrainers>(properties: P): ObjectStrainer<P> => ({
  asDecodeType: async value => mapProperties(ObjectStrainer, properties, value, (prop, item) => prop.asDecodeType(item)),
  asEncodeType: async value => mapProperties(ObjectStrainer, properties, value, (prop, item) => prop.asEncodeType(item))
})

/** Object keyed map of property decoders */
export type PropertyDecoders = {
  [key: string]: Decoder<unknown, unknown>
}

/** Specialized object decoder */
export type ObjectDecoder<P> = Decoder<
  { [K in keyof P]: P[K] extends Decoder<infer D, any> ? D : never },
  { [K in keyof P]: P[K] extends Decoder<any, infer E> ? E : never }>

/** Object Decoder Factory */
export const ObjectDecoder = <P extends PropertyDecoders>(properties: P): ObjectDecoder<P> => ({
  asDecodeType: async value => mapProperties(ObjectDecoder, properties, value, (prop, item) => prop.asDecodeType(item)),
  asEncodeType: async value => mapProperties(ObjectDecoder, properties, value, (prop, item) => prop.asEncodeType(item)),
  decode: async value => mapProperties(ObjectDecoder, properties, value, (prop, item) => prop.decode(item))
})

/** Object keyed map of property encoders */
export type PropertyEncoders = {
  [key: string]: Encoder<unknown, unknown>
}

/** Specialized object encoder */
export type ObjectEncoder<P> = Encoder<
  { [K in keyof P]: P[K] extends Encoder<infer D, any> ? D : never },
  { [K in keyof P]: P[K] extends Encoder<any, infer E> ? E : never }>

/** Object Encoder Factory */
export const ObjectEncoder = <P extends PropertyEncoders>(properties: P): ObjectEncoder<P> => ({
  asDecodeType: async value => mapProperties(ObjectEncoder, properties, value, (prop, item) => prop.asDecodeType(item)),
  asEncodeType: async value => mapProperties(ObjectEncoder, properties, value, (prop, item) => prop.asEncodeType(item)),
  encode: async value => mapProperties(ObjectEncoder, properties, value, (prop, item) => prop.encode(item))
})

/** Object keyed map of property coders */
export type PropertyCoders = {
  [key: string]: Coder<unknown, unknown>
}

/** Specialized object coder */
export type ObjectCoder<P> = Coder<
  { [K in keyof P]: P[K] extends Coder<infer D, any> ? D : never },
  { [K in keyof P]: P[K] extends Coder<any, infer E> ? E : never }>

/** Object Coder Factory */
export const ObjectCoder = <P extends PropertyCoders>(properties: P): ObjectCoder<P> => ({
  asDecodeType: async value => mapProperties(ObjectCoder, properties, value, (prop, item) => prop.asDecodeType(item)),
  asEncodeType: async value => mapProperties(ObjectCoder, properties, value, (prop, item) => prop.asEncodeType(item)),
  decode: async value => mapProperties(ObjectCoder, properties, value, (prop, item) => prop.decode(item)),
  encode: async value => mapProperties(ObjectCoder, properties, value, (prop, item) => prop.encode(item))
})
