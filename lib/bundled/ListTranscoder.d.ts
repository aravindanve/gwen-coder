import { Transcoder } from '../shared';
export declare const ListTranscoder: <T, E>(type: Transcoder<T, E>) => Transcoder<T[], E[]>;
