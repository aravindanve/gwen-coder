import { Coder } from '../Coder'

/** Decodes type string <- string and Encodes type string -> string  */
export const StringCoder = (): Coder<string, string> => ({
  decode: value => value,
  encode: value => value
})
