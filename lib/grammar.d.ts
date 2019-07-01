import * as bundled from './bundled';
export declare const Type: {
    undefined: () => import("./shared").Transcoder<undefined, undefined>;
    null: typeof bundled.NullCoder;
    boolean: typeof bundled.BooleanCoder;
    number: typeof bundled.NumberCoder;
    string: typeof bundled.StringCoder;
    array: typeof bundled.ArrayTranscoder;
    struct: typeof bundled.StructureTranscoder;
    anyOf: typeof bundled.UnionTranscoder;
    optional: typeof bundled.OptionalTranscoder;
    nullable: typeof bundled.NullableTranscoder;
};
