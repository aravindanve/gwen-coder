import { Transcoder } from '../shared'
import { NullCoder } from './NullCoder'
import { UnionTranscoder } from './UnionTranscoder'

/** Nullable transcoder factory */
export const NullableTranscoder = <T, E>(type: Transcoder<T, E>): Transcoder<null | T, null | E> =>
  UnionTranscoder(NullCoder(), type)
