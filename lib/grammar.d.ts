import * as bundled from './bundled';
import { CodingOptions } from './shared';
export declare const Type: {
    setDefaultCodingOptions(options: CodingOptions): void;
    configured: typeof bundled.ConfiguredTranscoder;
    undefined: () => import("./shared").Transcoder<undefined, undefined>;
    null: () => import("./shared").Transcoder<null, null>;
    boolean: () => import("./shared").Transcoder<boolean, boolean>;
    number: () => import("./shared").Transcoder<number, number>;
    string: () => import("./shared").Transcoder<string, string>;
    list: <T, E>(type: import("./shared").Transcoder<T, E>) => import("./shared").Transcoder<T[], E[]>;
    struct: typeof bundled.StructureTranscoder;
    anyOf: typeof bundled.UnionTranscoder;
    optional: <T, E>(type: import("./shared").Transcoder<T, E>) => import("./shared").Transcoder<T | undefined, E | undefined>;
    nullable: <T, E>(type: import("./shared").Transcoder<T, E>) => import("./shared").Transcoder<T | null, E | null>;
    any: () => import("./shared").Transcoder<any, any>;
    literal: <T extends bundled.LiteralType>(literal: T) => import("./shared").Transcoder<T, T>;
    integer: () => import("./shared").Transcoder<number, number>;
    dateTime: () => import("./shared").Transcoder<Date, string>;
    record: <K extends string, T, E>(keyType: import("./shared").Transcoder<K, K>, valueType: import("./shared").Transcoder<T, E>) => import("./shared").Transcoder<bundled.Record<K, T>, bundled.Record<K, E>>;
    tuple: typeof bundled.TupleTranscoder;
};
