import { Transcoder } from '../shared'
import { NullCoder } from './NullCoder'

/** Nullable Transcoder Factory */
export function NullableTranscoder<T, E>(type: Transcoder<T, E>): Transcoder<T | null, E | null> {
  const coder = NullCoder()

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
