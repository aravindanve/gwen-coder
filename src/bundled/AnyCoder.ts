import { Coder } from '../shared'

/** Any Coder Factory */
export const AnyCoder = (): Coder<any> => ({
  assert: data => data,
  decode: data => data,
  encode: data => data
})
