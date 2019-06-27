import { Coder } from '../Coder'

/** Decodes type Date <- string and Encodes type Date -> string  */
export const DateCoder = (): Coder<Date, string> => ({
  decode: value => new Date(value),
  encode: value => value.toISOString()
})
