"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const errors_1 = require("../errors");
const tag = 'NullCoder';
const typeDescription = 'null';
exports.NullCoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert(value) {
        return value === null
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
    },
    decode(value, options) {
        if (value === null) {
            return Promise.resolve(value);
        }
        const coerce = options
            ? options.coerceNullFromStringOnDecode
            : shared_1.defaultCodingOptions.coerceNullFromStringOnDecode;
        return coerce && typeof value === 'string' && value.toLowerCase() === 'null'
            ? Promise.resolve(null)
            : Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
    },
    encode(value) {
        return value === null
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }));
    }
});
//# sourceMappingURL=NullCoder.js.map