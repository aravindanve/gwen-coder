"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bundled = require("./bundled");
exports.Type = {
    undefined: bundled.UndefinedCoder,
    null: bundled.NullCoder,
    boolean: bundled.BooleanCoder,
    number: bundled.NumberCoder,
    string: bundled.StringCoder,
    array: bundled.ArrayTranscoder,
    struct: bundled.StructureTranscoder,
    anyOf: bundled.UnionTranscoder,
    optional: bundled.OptionalTranscoder,
    nullable: bundled.NullableTranscoder,
};
//# sourceMappingURL=grammar.js.map