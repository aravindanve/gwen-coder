import { Coder } from '../shared';
export declare type LiteralType = null | boolean | number | string;
export declare function LiteralCoder<T extends LiteralType>(value: T): Coder<T>;
