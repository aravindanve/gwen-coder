import { Transcoder } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

/** Date-Time Transcoder Factory */
export const DateTimeTranscoder = (): Transcoder<Date, string> => ({
  pipe(data) {
    if (Object.prototype.toString.call(data) === '[object Date]' && !isNaN(data.getTime())) {
      return data
    }

    throw AssertionError.new(`Expected ${data} to be Date`)
  },
  decode(data) {
    if (typeof data === 'string') {
      const date = new Date(data)

      if (!isNaN(date.getTime())) {
        return date
      }
    }

    throw DecodingError.new(`Could not decode data ${data} as Date`)
  },
  encode(data) {
    if (Object.prototype.toString.call(data) === '[object Date]') {
      try {
        return data.toISOString()

      } catch {
        // do nothing
      }
    }

    throw EncodingError.new(`Could not encode data ${data} to date-time string`)
  }
})
