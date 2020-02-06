import { Transcoder } from '../shared'
import { UndefinedCoder } from './UndefinedCoder'
import { UnionTranscoder } from './UnionTranscoder'

/** Optional transcoder factory */
export const OptionalTranscoder = <T, E>(type: Transcoder<T, E>): Transcoder<undefined | T, undefined | E> =>
  UnionTranscoder(UndefinedCoder(), type)
