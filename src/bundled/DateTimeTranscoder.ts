import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'DateTimeTranscoder'
const typeDescription = 'Date'
const encodedTypeDescription = 'string (date-time)'

/** Date-Time transcoder factory */
export const DateTimeTranscoder = (): Transcoder<Date, string> => ({
  tag,
  typeDescription,
  encodedTypeDescription,
  assert(value) {
    return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())
      ? Promise.resolve(value)
      : Promise.reject(new AssertionError({ tag, value, expected: typeDescription }))
  },
  decode(value) {
    if (typeof value === 'string') {
      const date = new Date(value)

      if (!isNaN(date.getTime())) {
        return Promise.resolve(date)
      }
    }

    return Promise.reject(new DecodingError({ tag, value, expected: typeDescription }))
  },
  encode(value) {
    return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())
      ? Promise.resolve(value.toISOString())
      : Promise.reject(new EncodingError({ tag, value, expected: encodedTypeDescription }))
  }
})
