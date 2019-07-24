import { Transcoder, CodingOptions } from '../shared'

/** Specialized configured transcoder */
export interface ConfiguredTranscoder<T, E> extends Transcoder<T, E> {
  codingOptions: CodingOptions
  setCodingOptions(options: CodingOptions): void
}

/** Configured Transcoder Factory */
export function ConfiguredTranscoder<T, E>(coder: Transcoder<T, E>, codingOptions: CodingOptions): ConfiguredTranscoder<T, E> {
  return {
    codingOptions,
    setCodingOptions(options) {
      Object.assign(codingOptions, options)
    },
    pipe: (data) => coder.pipe(data, codingOptions),
    decode: (data) => coder.decode(data, codingOptions),
    encode: (data) => coder.encode(data, codingOptions)
  }
}
