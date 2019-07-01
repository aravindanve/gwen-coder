import { Transcoder, CodingOptions } from '../shared';
export declare function NullableTranscoder<T, E>(type: Transcoder<T, E>, options?: CodingOptions): Transcoder<T | null, E | null>;
