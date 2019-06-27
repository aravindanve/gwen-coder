import { Coder } from '../Coder'

/** Decodes type T[] <- S[] and Encodes type T[] -> S[]  */
export const ArrayCoder = <T, S>(item: Coder<T, S>): Coder<T[], S[]> => ({
  decode: value => Promise.all(value.map(item.decode)),
  encode: value => Promise.all(value.map(item.encode))
})
