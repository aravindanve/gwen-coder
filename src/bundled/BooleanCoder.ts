import { Coder } from '../Coder'

/** Decodes type boolean <- boolean and Encodes type boolean -> boolean  */
export const BooleanCoder = (): Coder<boolean, boolean> => ({
  decode: value => value,
  encode: value => value
})
