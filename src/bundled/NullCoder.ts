import { Coder } from '../Coder'

/** Decodes type null <- null and Encodes type null -> null  */
export const NullCoder = (): Coder<null, null> => ({
  decode: value => value,
  encode: value => value
})
