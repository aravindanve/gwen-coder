"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const errors_1 = require("../errors");
const tag = 'TupleTranscoder';
function TupleTranscoder(...types) {
    const typeDescription = `[${types.map(type => type.typeDescription).join(', ')}]`;
    const encodedTypeDescription = `[${types.map(type => type.encodedTypeDescription).join(', ')}]`;
    return {
        tag,
        typeDescription,
        encodedTypeDescription,
        assert(value, options) {
            if (!Array.isArray(value)) {
                return Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
            }
            if (!(options ? options.ignoreExtraOnAssert : shared_1.defaultCodingOptions.ignoreExtraOnAssert) &&
                types.length !== value.length) {
                return Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }, `Expected a tuple of length ${types.length}, instead found: tupe of length ${value.length}`));
            }
            return Promise.all(types.map((type, i) => type.assert(value[i], options)))
                .then(() => value)
                .catch(err => Promise.reject(errors_1.AssertionError.pushContext(err, { tag, expected: typeDescription })));
        },
        decode(value, options) {
            return !Array.isArray(value)
                ? Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }))
                : Promise.all(types.map((type, i) => type.decode(value[i], options)))
                    .catch(err => Promise.reject(errors_1.DecodingError.pushContext(err, { tag, expected: typeDescription })));
        },
        encode(value, options) {
            return !Array.isArray(value)
                ? Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }))
                : Promise.all(types.map((type, i) => type.encode(value[i], options)))
                    .catch(err => Promise.reject(errors_1.EncodingError.pushContext(err, { tag, expected: typeDescription })));
        }
    };
}
exports.TupleTranscoder = TupleTranscoder;
//# sourceMappingURL=TupleTranscoder.js.map