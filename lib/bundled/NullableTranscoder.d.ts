import { Transcoder } from '../shared';
export declare function NullableTranscoder<T, E>(type: Transcoder<T, E>): Transcoder<T | null, E | null>;
