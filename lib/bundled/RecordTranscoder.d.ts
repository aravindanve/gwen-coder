import { Transcoder } from '../shared';
export declare type RecordKeyType = string;
export declare type Record<K, V> = K extends string ? {
    [key: string]: V;
} : never;
export declare const RecordTranscoder: <K extends string, T, E>(keyType: Transcoder<K, K>, valueType: Transcoder<T, E>) => Transcoder<Record<K, T>, Record<K, E>>;
