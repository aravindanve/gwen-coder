import { Coder } from '../Coder'

/** Decodes type number <- number and Encodes type number -> number  */
export const NumberCoder = (): Coder<number, number> => ({
  decode: value => value,
  encode: value => value
})
