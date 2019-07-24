import { Transcoder } from '../shared'
import { UndefinedCoder } from './UndefinedCoder'

/** Optional Transcoder Factory */
export function OptionalTranscoder<T, E>(type: Transcoder<T, E>): Transcoder<T | undefined, E | undefined> {
  const coder = UndefinedCoder()

  return {
    pipe(data, options) {
      try {
        return coder.pipe(data as any, options)

      } catch {
        return type.pipe(data as any, options)
      }
    },
    decode(data, options) {
      try {
        return coder.decode(data as any, options)

      } catch {
        return type.decode(data as any, options)
      }
    },
    encode(data, options) {
      try {
        return coder.encode(data as any, options)

      } catch {
        return type.encode(data as any, options)
      }
    }
  }
}
