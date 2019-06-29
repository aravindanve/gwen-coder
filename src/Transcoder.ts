import { Transcoder } from './shared'
import { EncodingError, DecodingError, AssertionError } from './errors'

export function Transcoder<T, E>(transcoder: Partial<Transcoder<T, E>>): Transcoder<T, E> {
  return {
    codingOptions: {},
    pipe() {
      throw AssertionError.new('Not implemented')
    },
    decode() {
      throw DecodingError.new('Not implemented')
    },
    encode() {
      throw EncodingError.new('Not implemented')
    },
    ...transcoder
  }
}
