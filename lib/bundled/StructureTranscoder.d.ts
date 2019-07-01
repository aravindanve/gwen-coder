import { Transcoder } from '../shared';
export declare type PropertyTranscoders = {
    [key: string]: Transcoder<unknown, unknown>;
};
export declare type AdditionalPropertyTranscoder = Transcoder<unknown, unknown>;
export declare type AlwaysDefinedKeys<T> = {
    [K in keyof T]: undefined extends T[K] ? never : K;
}[keyof T];
export declare type Structure<T> = Partial<T> & Pick<T, AlwaysDefinedKeys<T>>;
export declare type StructureTranscoder<P> = Transcoder<Structure<{
    [K in keyof P]: P[K] extends Transcoder<infer T, any> ? T : never;
}>, Structure<{
    [K in keyof P]: P[K] extends Transcoder<any, infer E> ? E : never;
}>>;
export declare function StructureTranscoder<P extends PropertyTranscoders>(properties: P): StructureTranscoder<P>;
