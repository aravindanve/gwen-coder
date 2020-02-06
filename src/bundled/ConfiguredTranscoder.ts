import { Transcoder, CodingOptions } from '../shared'
import { AssertionError, DecodingError, EncodingError } from '../errors'

const tag = 'ConfiguredTranscoder'

/** Specialized configured transcoder */
export interface ConfiguredTranscoder<T, E> extends Transcoder<T, E> {
  codingOptions: CodingOptions
  setCodingOptions(options: CodingOptions): void
}

/** Configured transcoder factory */
export function ConfiguredTranscoder<T, E>(type: Transcoder<T, E>, codingOptions: CodingOptions): ConfiguredTranscoder<T, E> {
  const typeDescription = `Configured<${type.typeDescription}>`
  const encodedTypeDescription = `Configured<${type.encodedTypeDescription}>`

  return {
    tag,
    typeDescription,
    encodedTypeDescription,
    codingOptions,
    setCodingOptions: options => (Object.assign(codingOptions, options), void 0),
    assert: (value) => type.assert(value, codingOptions).catch(err =>
      Promise.reject(AssertionError.pushContext(err, { tag, expected: typeDescription }))),

    decode: (value) => type.decode(value, codingOptions).catch(err =>
      Promise.reject(DecodingError.pushContext(err, { tag, expected: typeDescription }))),

    encode: (value) => type.encode(value, codingOptions).catch(err =>
      Promise.reject(EncodingError.pushContext(err, { tag, expected: encodedTypeDescription }))),
  }
}
