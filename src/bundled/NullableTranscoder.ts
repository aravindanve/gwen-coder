import { Transcoder, CodingOptions } from '../shared'
import { NullCoder } from './NullCoder'

/** Nullable Transcoder Factory */
export function NullableTranscoder<T, E>(type: Transcoder<T, E>, options?: CodingOptions): Transcoder<T | null, E | null> {
  const codingOptions = options || {}
  const nullCoder = NullCoder(codingOptions)

  return {
    codingOptions,
    pipe(data) {
      try {
        return nullCoder.pipe(data as any)

      } catch {
        return type.pipe(data as any)
      }
    },
    decode(data) {
      try {
        return nullCoder.decode(data as any)

      } catch {
        return type.decode(data as any)
      }
    },
    encode(data) {
      try {
        return nullCoder.encode(data as any)

      } catch {
        return type.encode(data as any)
      }
    }
  }
}
