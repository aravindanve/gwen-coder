import { Coder } from '../Coder'

/** String keyed map of property transcoders */
export type PropertyCoders = {
  [key: string]: Coder<unknown, unknown>
}

/** Specialized object transcoder */
export type ObjectCoder<P> = Coder<
  { [K in keyof P]: P[K] extends Coder<infer T, infer S> ? T : never },
  { [K in keyof P]: P[K] extends Coder<infer T, infer S> ? S : never }>

/** Decodes type T{} <- S{} and Encodes type T{} -> S{}  */
export const ObjectCoder = <P extends PropertyCoders>(properties: P): ObjectCoder<P> => ({
  async decode(value) {
    let result = {} as any
    for (const [key, transcoder] of Object.entries(properties)) {
      result[key] = await transcoder.decode(value[key])
    }

    return result
  },
  async encode(value) {
    let result = {} as any
    for (const [key, transcoder] of Object.entries(properties)) {
      result[key] = await transcoder.encode(value[key])
    }

    return result
  }
})
