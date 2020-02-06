import { Transcoder } from '../shared';
export declare const NullableTranscoder: <T, E>(type: Transcoder<T, E>) => Transcoder<T | null, E | null>;
