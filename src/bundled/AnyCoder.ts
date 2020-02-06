import { Coder } from '../shared'

const tag = 'AnyCoder'
const typeDescription = 'any'

/** Any coder factory */
export const AnyCoder = (): Coder<any> => ({
  tag,
  typeDescription,
  encodedTypeDescription: typeDescription,
  assert: value => Promise.resolve(value),
  decode: value => Promise.resolve(value),
  encode: value => Promise.resolve(value)
})
