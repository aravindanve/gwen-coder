import { Transcoder } from '../shared'

/** Optional Transcoder Factory */
export function OptionalTranscoder<T, E>(type: Transcoder<T, E>): Transcoder<T | undefined, E | undefined> {
  return {
    codingOptions: {},
    pipe(data) {
      if (data === undefined) {
        return
      }

      return type.pipe(data)
    },
    decode(data) {
      if (data === undefined) {
        return
      }

      return type.decode(data)
    },
    encode(data) {
      if (data === undefined) {
        return
      }

      return type.encode(data)
    }
  }
}
