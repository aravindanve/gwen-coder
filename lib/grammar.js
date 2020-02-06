"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bundled = require("./bundled");
const shared_1 = require("./shared");
exports.Type = {
    setDefaultCodingOptions(options) {
        Object.assign(shared_1.defaultCodingOptions, options);
    },
    configured: bundled.ConfiguredTranscoder,
    undefined: bundled.UndefinedCoder,
    null: bundled.NullCoder,
    boolean: bundled.BooleanCoder,
    number: bundled.NumberCoder,
    string: bundled.StringCoder,
    list: bundled.ListTranscoder,
    struct: bundled.StructureTranscoder,
    anyOf: bundled.UnionTranscoder,
    optional: bundled.OptionalTranscoder,
    nullable: bundled.NullableTranscoder,
    any: bundled.AnyCoder,
    literal: bundled.LiteralCoder,
    integer: bundled.IntegerCoder,
    dateTime: bundled.DateTimeTranscoder,
    record: bundled.RecordTranscoder,
    tuple: bundled.TupleTranscoder,
};
//# sourceMappingURL=grammar.js.map