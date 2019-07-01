import { Transcoder } from '../shared';
export declare function OptionalTranscoder<T, E>(type: Transcoder<T, E>): Transcoder<T | undefined, E | undefined>;
