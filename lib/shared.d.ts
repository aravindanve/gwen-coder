export declare type PipeOptions = {
    ignoreExtraOnPipe?: boolean;
};
export declare type DecodingOptions = {
    coerceOnDecode?: boolean;
    coerceNullFromStringOnDecode?: boolean;
};
export declare type EncodingOptions = {};
export declare type CodingOptions = PipeOptions & DecodingOptions & EncodingOptions;
export interface Transcoder<T, E> {
    pipe(data: T, options?: PipeOptions): T | Promise<T>;
    decode(data: E, options?: DecodingOptions): T | Promise<T>;
    encode(data: T, options?: EncodingOptions): E | Promise<E>;
}
export declare type Coder<T> = Transcoder<T, T>;
export declare type Type<C> = C extends Coder<infer T1> ? T1 : C extends Transcoder<infer T2, any> ? T2 : never;
export declare type EncodedType<C> = C extends Coder<infer E1> ? E1 : C extends Transcoder<any, infer E2> ? E2 : never;
export declare function Transcoder<T, E>(transcoder: Transcoder<T, E>): Transcoder<T, E>;
export declare function Coder<T, E>(coder: Coder<T>): Coder<T>;
