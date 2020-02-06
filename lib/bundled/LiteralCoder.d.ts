export declare type LiteralType = null | boolean | number | string;
export declare const LiteralCoder: <T extends LiteralType>(literal: T) => import("../shared").Transcoder<T, T>;
