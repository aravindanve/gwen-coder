import { Transcoder } from '../shared';
export declare const OptionalTranscoder: <T, E>(type: Transcoder<T, E>) => Transcoder<T | undefined, E | undefined>;
